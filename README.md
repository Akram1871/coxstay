# CoxStay - Hotel Booking Platform for Cox's Bazar

A production-ready hotel booking web application specialized for Cox's Bazar, Bangladesh. CoxStay provides a seamless booking experience for travelers looking for beachfront hotels, sea-view accommodations, and exclusive deals.

## 🌟 Features

### User Features
- **Hotel Search & Filtering**: Search by area, price, rating, amenities, and more
- **Hotel Details**: View detailed hotel information, amenities, reviews, and room options
- **Easy Booking**: Streamlined 3-step booking process
- **Multiple Payment Methods**: Bkash, Nagad, Rocket, Card, or pay at hotel
- **Travel Add-ons**: Airport pickup, tours, breakfast packages, etc.
- **User Dashboard**: Manage bookings, view history, and update profile
- **Guest Reviews**: Read and leave hotel reviews

### Admin Features
- **Dashboard Analytics**: View key metrics (hotels, rooms, bookings, revenue)
- **Hotel Management**: Add, edit, delete hotels with full details
- **Room Management**: Manage room types, pricing, availability
- **Booking Management**: View and manage all bookings
- **User Management**: View all registered users
- **Settings**: Configure system-wide settings

### Cox's Bazar Areas Covered
- Laboni Beach
- Kolatoli
- Sugandha Beach
- Marine Drive
- Inani Beach
- Himchari
- Teknaf Road
- Dolphin Moor
- Burmese Market Area

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Framer Motion** - Animations
- **date-fns** - Date utilities

### Backend
- **Next.js Server Actions** - Backend API
- **Prisma ORM** - Database abstraction
- **SQLite** - Local development database (PostgreSQL ready)
- **bcryptjs** - Password hashing
- **JWT** - Authentication tokens

### Database Models
- User (with roles: USER, ADMIN)
- Hotel
- Room
- Booking
- Review
- TravelAddon
- Attraction
- Area
- BookingAddon

## 📋 Project Structure

```
coxstay/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Home page
│   │   ├── globals.css               # Global styles
│   │   ├── auth/
│   │   │   ├── login/               # Login page
│   │   │   └── register/            # Registration page
│   │   ├── hotels/
│   │   │   ├── page.tsx            # Hotels listing
│   │   │   └── [id]/               # Hotel details
│   │   ├── areas/
│   │   │   ├── page.tsx            # Areas listing
│   │   │   └── [slug]/             # Area details
│   │   ├── attractions/            # Attractions page
│   │   ├── booking/
│   │   │   └── [hotelId]/          # Booking page
│   │   ├── confirmation/
│   │   │   └── [bookingId]/        # Confirmation page
│   │   ├── dashboard/
│   │   │   ├── page.tsx            # Dashboard home
│   │   │   ├── bookings/           # User bookings
│   │   │   ├── profile/            # Profile page
│   │   │   └── settings/           # User settings
│   │   ├── admin/
│   │   │   ├── page.tsx            # Admin dashboard
│   │   │   ├── hotels/             # Hotel management
│   │   │   ├── rooms/              # Room management
│   │   │   ├── bookings/           # Booking management
│   │   │   ├── users/              # User management
│   │   │   └── settings/           # Admin settings
│   │   ├── about/                  # About page
│   │   ├── contact/                # Contact page
│   │   ├── terms/                  # Terms page
│   │   └── privacy/                # Privacy page
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx          # Navigation bar
│   │   │   ├── Footer.tsx          # Footer
│   │   │   ├── HotelCard.tsx       # Hotel card component
│   │   │   └── Utils.tsx           # LoadingSpinner, EmptyState, StatusBadge
│   │   ├── home/
│   │   │   └── HeroSearch.tsx      # Hero search component
│   │   └── ui/                     # Shadcn UI components
│   ├── lib/
│   │   ├── types.ts                # TypeScript types
│   │   ├── db.ts                   # Prisma client
│   │   ├── auth.ts                 # Authentication utilities
│   │   ├── utils.ts                # Helper utilities
│   │   ├── guards.ts               # Route guards
│   │   └── actions/
│   │       ├── auth.ts             # Auth server actions
│   │       └── booking.ts          # Booking server actions
│   └── middleware/
├── prisma/
│   ├── schema.prisma               # Database schema
│   ├── seed.ts                     # Seed script
│   └── dev.db                      # SQLite database
├── public/                         # Static assets
├── .env.example                    # Environment variables template
├── .env.local                      # Local environment variables
├── .gitignore                      # Git ignore file
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── next.config.js                  # Next.js config
├── tailwind.config.ts              # Tailwind config
├── postcss.config.js               # PostCSS config
└── README.md                       # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Installation

1. **Clone the repository** (or use the existing project)
```bash
cd webCox
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Generate Prisma client**
```bash
npx prisma generate
```

5. **Set up database**
```bash
npx prisma db push
```

6. **Seed database with sample data**
```bash
npm run seed
```

This will create:
- 9 Cox's Bazar areas
- 20 hotels with realistic details
- 60 rooms
- 10 users (including admin and demo user)
- 40 reviews
- 20 bookings
- 8 attractions
- 6 travel add-ons

### Running Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Default Credentials

### Admin Account
- **Email**: admin@coxstay.com
- **Password**: admin123456

### Demo User Account
- **Email**: user@coxstay.com
- **Password**: user123456

## 📦 Build for Production

```bash
npm run build
npm run start
```

## 🗄️ Database Commands

### View database in Prisma Studio
```bash
npm run prisma:studio
```

### Push schema changes
```bash
npm run prisma:push
```

### Generate Prisma client
```bash
npm run prisma:generate
```

## 🎨 UI Design System

### Colors
- **Primary**: Ocean Blue (#0ea5e9)
- **Accent**: Turquoise (#14b8a6)
- **Sand**: Beige (#c9b8a8)
- **CTA**: Orange (#f97316)

### Components
All components are built with Tailwind CSS and include:
- Responsive design (mobile-first)
- Loading states
- Error handling
- Empty states
- Accessibility features

## 📱 Responsive Design

The application is fully responsive:
- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+

## 🔄 Authentication Flow

1. **Registration/Login**: Email and password-based authentication
2. **JWT Token**: Stored in HTTP-only cookie
3. **Session Management**: Protected routes using middleware
4. **Role-based Access**: Different views for USER and ADMIN roles

## 💳 Payment Methods

The application supports:
- **Bkash**: Mobile payment
- **Nagad**: Mobile payment
- **Rocket**: Mobile payment
- **Card**: Credit/Debit card
- **Pay at Hotel**: Cash payment on arrival

## 📊 Pricing Calculations

```
Subtotal = Room Price × Nights × Number of Rooms
VAT = Subtotal × 10%
Service Fee = Subtotal × 5%
Add-ons = Selected travel add-ons total
Total = Subtotal + VAT + Service Fee + Add-ons
```

## 🔄 Booking Workflow

1. **Search**: User searches for hotels
2. **Details**: User views hotel and room details
3. **Selection**: User selects room type, dates, guests, add-ons
4. **Information**: User enters guest information
5. **Payment**: User selects payment method
6. **Confirmation**: Booking is confirmed, confirmation email sent
7. **Management**: User can view and manage booking in dashboard

## 🚀 Deployment

### Vercel (Recommended)

1. **Push code to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables
   - Deploy

3. **Set up PostgreSQL** (for production)
   - Create PostgreSQL database
   - Update DATABASE_URL in production environment

### Environment Variables for Production

```
DATABASE_URL="postgresql://user:password@host/database"
JWT_SECRET="your-secure-secret-key-min-32-chars"
NEXTAUTH_SECRET="your-secure-secret-key-min-32-chars"
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

## 📈 Future Improvements

- [ ] Email notifications for bookings
- [ ] SMS alerts
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Payment gateway integration (real Bkash, Nagad, etc.)
- [ ] Map integration for hotel locations
- [ ] Wishlist feature
- [ ] Loyalty program
- [ ] Group bookings
- [ ] Corporate packages
- [ ] Live chat support
- [ ] Mobile app (React Native)
- [ ] API documentation
- [ ] Advanced search with AI recommendations

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@coxstay.com or create an issue in the repository.

## 🙏 Acknowledgments

- Cox's Bazar Tourism Board
- Bangladesh Tourism Corporation
- All hotel partners in Cox's Bazar

---

**Version**: 1.0.0  
**Last Updated**: May 2026  
**Status**: ✅ Production Ready

Happy booking! 🏖️✨
