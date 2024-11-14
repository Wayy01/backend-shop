export const mockConcerts = [
  {
    id: '1',
    title: 'Taylor Swift - The Eras Tour',
    description: 'Experience the music of all eras in this spectacular performance.',
    event_date: '2024-08-15T19:00:00',
    doors_open: '2024-08-15T17:30:00',
    featured_image_url: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600',
    venue: {
      name: 'Madison Square Garden',
      address: '4 Pennsylvania Plaza',
      city: 'New York',
      country: 'USA',
      capacity: 20000
    },
    ticket_categories: [
      { id: '1-vip', name: 'VIP', price: 599.99, quantity: 100, remaining: 20 },
      { id: '1-ga', name: 'General Admission', price: 199.99, quantity: 1000, remaining: 400 }
    ]
  },
  {
    id: '2',
    title: 'Ed Sheeran - Mathematics Tour',
    description: 'A night of acoustic perfection and chart-topping hits.',
    event_date: '2024-09-20T20:00:00',
    doors_open: '2024-09-20T18:30:00',
    featured_image_url: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=600',
    venue: {
      name: 'Wembley Stadium',
      address: 'Empire Way',
      city: 'London',
      country: 'UK',
      capacity: 90000
    },
    ticket_categories: [
      { id: '2-vip', name: 'VIP Package', price: 499.99, quantity: 200, remaining: 50 },
      { id: '2-premium', name: 'Premium Seats', price: 299.99, quantity: 500, remaining: 100 },
      { id: '2-ga', name: 'General Admission', price: 149.99, quantity: 2000, remaining: 800 }
    ]
  },
  {
    id: '3',
    title: 'Coldplay - Music of the Spheres',
    description: 'An otherworldly experience with one of the biggest bands in the world.',
    event_date: '2024-10-05T20:30:00',
    doors_open: '2024-10-05T18:30:00',
    featured_image_url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600',
    venue: {
      name: 'Rose Bowl',
      address: '1001 Rose Bowl Dr',
      city: 'Pasadena',
      country: 'USA',
      capacity: 95000
    },
    ticket_categories: [
      { id: '3-vip', name: 'VIP Experience', price: 450.00, quantity: 300, remaining: 75 },
      { id: '3-premium', name: 'Premium Seats', price: 250.00, quantity: 1000, remaining: 200 },
      { id: '3-ga', name: 'General Admission', price: 125.00, quantity: 5000, remaining: 2000 }
    ]
  },
  {
    id: '4',
    title: 'Beyoncé - Renaissance World Tour',
    description: 'The cultural event of the year, featuring the queen of pop herself.',
    event_date: '2024-07-01T21:00:00',
    doors_open: '2024-07-01T19:00:00',
    featured_image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=600',
    venue: {
      name: 'SoFi Stadium',
      address: '1001 Stadium Dr',
      city: 'Los Angeles',
      country: 'USA',
      capacity: 70000
    },
    ticket_categories: [
      { id: '4-vip', name: 'CLUB RENAISSANCE VIP', price: 899.99, quantity: 150, remaining: 10 },
      { id: '4-premium', name: 'Premium Floor', price: 399.99, quantity: 800, remaining: 100 },
      { id: '4-ga', name: 'General Admission', price: 199.99, quantity: 3000, remaining: 500 }
    ]
  },
  {
    id: '5',
    title: 'The Weeknd - After Hours Tour',
    description: 'A cinematic experience blending music and visual artistry.',
    event_date: '2024-11-15T20:00:00',
    doors_open: '2024-11-15T18:00:00',
    featured_image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600',
    venue: {
      name: 'Allegiant Stadium',
      address: '3333 Al Davis Way',
      city: 'Las Vegas',
      country: 'USA',
      capacity: 65000
    },
    ticket_categories: [
      { id: '5-vip', name: 'VIP Experience', price: 599.99, quantity: 200, remaining: 45 },
      { id: '5-premium', name: 'Premium Seats', price: 299.99, quantity: 1000, remaining: 300 },
      { id: '5-ga', name: 'General Admission', price: 149.99, quantity: 2500, remaining: 1000 }
    ]
  }
]

// Mock orders data structure
export const mockOrders = []

// Mock user roles
export const userRoles = {
  ADMIN: 'admin',
  USER: 'user'
}
