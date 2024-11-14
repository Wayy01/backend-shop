import { createServerClient } from '@/lib/supabase/server'

/**
 * Fetches all published events from the database with their related venue and ticket categories
 * Events are ordered by date (ascending)
 *
 * @returns {Promise<Array>} Array of event objects with nested venue and ticket category data
 */
export async function getEvents() {
  const supabase = createServerClient()

  const { data: events, error } = await supabase
    .from('events')
    .select(`
      *,
      venue:venues(*),
      ticket_categories(*)
    `)
    .eq('is_published', true)
    .order('event_date', { ascending: true })

  if (error) throw error
  return events
}

/**
 * Fetches a single event by ID with its related venue and ticket categories
 *
 * @param {string|number} id - The ID of the event to fetch
 * @returns {Promise<Object>} Event object with nested venue and ticket category data
 */
export async function getEvent(id) {
  const supabase = createServerClient()

  const { data: event, error } = await supabase
    .from('events')
    .select(`
      *,
      venue:venues(*),
      ticket_categories(*)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return event
}

/**
 * Creates a new order with associated tickets and order items
 * Handles the entire order creation process as a logical transaction
 *
 * @param {string} userId - ID of the user making the purchase
 * @param {Array} items - Array of cart items containing ticket info and quantities
 * @param {number} total - Total amount of the order
 * @returns {Promise<Object>} Created order object
 */
export async function createOrder(userId, items, total) {
  const supabase = createServerClient()

  // First create the main order record
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      total_amount: total,
      status: 'completed',
      payment_method: 'card'
    })
    .select()
    .single()

  if (orderError) throw orderError

  // Process each item in the cart
  for (const item of items) {
    // Create individual tickets for each quantity of the item
    const { data: tickets, error: ticketError } = await supabase
      .from('tickets')
      .insert(Array(item.quantity).fill({
        category_id: item.ticketId,
        status: 'sold'
      }))
      .select()

    if (ticketError) throw ticketError

    // Create order items linking tickets to the order
    const orderItems = tickets.map(ticket => ({
      order_id: order.id,
      ticket_id: ticket.id,
      price_at_time: item.price // Store historical price at time of purchase
    }))

    const { error: itemError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemError) throw itemError
  }

  return order
}

/**
 * Fetches all orders for a specific user with complete ticket and event details
 * Results are ordered by creation date (newest first)
 *
 * @param {string} userId - ID of the user whose orders to fetch
 * @returns {Promise<Array>} Array of order objects with nested ticket, event, and venue data
 */
export async function getUserOrders(userId) {
  const supabase = createServerClient()

  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        ticket:tickets (
          *,
          category:ticket_categories (
            *,
            event:events (
              *,
              venue:venues(*)
            )
          )
        )
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return orders
}
