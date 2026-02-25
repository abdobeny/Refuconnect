RefuConnect/
├── backend/                       # LARAVEL (API & Logic)
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   └── Api/           # All endpoints return JSON
│   │   │   │       ├── AuthController.php
│   │   │   │       ├── AnimalController.php
│   │   │   │       ├── AdoptionController.php
│   │   │   │       ├── CouplingController.php
│   │   │   │       ├── DonationController.php
│   │   │   │       └── ToiletBookingController.php
│   │   │   ├── Middleware/        # Security (Admin vs User)
│   │   │   ├── Requests/          # Form Validation Rules
│   │   │   │   ├── StoreAnimalRequest.php
│   │   │   │   └── StoreCouplingRequest.php
│   │   │   └── Resources/         # JSON Response Formatting
│   │   │       └── AnimalResource.php
│   │   ├── Models/                # Database Tables Representation
│   │   │   ├── User.php
│   │   │   ├── Animal.php
│   │   │   ├── Adoption.php
│   │   │   ├── Coupling.php
│   │   │   └── ...
│   ├── database/
│   │   ├── migrations/            # Database Schema (The Blueprint)
│   │   │   ├── 01_create_users_table.php
│   │   │   ├── 02_create_animals_table.php
│   │   │   ├── 03_create_adoptions_table.php
│   │   │   └── ...
│   │   └── seeders/               # Fake data for testing
│   ├── routes/
│   │   ├── api.php                # WHERE WE DEFINE ENDPOINTS
│   │   └── web.php                # (Unused for API, but keeps Laravel happy)
│   ├── storage/
│   │   └── app/public/images/     # Where animal photos live
│   └── .env                       # DB Passwords (DO NOT SHARE)
│
├── frontend/                      # REACT + VITE (User Interface)
│   ├── public/                    # Static assets (favicon, logos)
│   ├── src/
│   │   ├── api/                   # Connection to Backend
│   │   │   └── axiosClient.js     # Configured Axios instance
│   │   ├── components/
│   │   │   ├── layout/            # Structure components
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── SidebarAdmin.jsx
│   │   │   ├── ui/                # Reusable "Bricks"
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   └── Badge.jsx
│   │   │   └── features/          # Complex blocks
│   │   │       ├── animals/
│   │   │       │   ├── AnimalCard.jsx
│   │   │       │   └── AnimalGrid.jsx
│   │   │       └── forms/
│   │   │           └── AdoptionForm.jsx
│   │   ├── context/               # Global State (Auth)
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/                 # Custom logic
│   │   │   └── useAuth.js
│   │   ├── lib/                   # Utilities
│   │   │   └── utils.js           # (The file we just fixed!)
│   │   ├── pages/                 # Full Screen Views
│   │   │   ├── public/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Animals.jsx
│   │   │   │   ├── AnimalDetail.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   └── admin/             # Protected Routes
│   │   │       ├── Dashboard.jsx
│   │   │       └── ManageAnimals.jsx
│   │   ├── App.jsx                # Router setup
│   │   ├── index.css              # Tailwind Imports
│   │   └── main.jsx               # Entry Point
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js          # Tailwind Processor
│   ├── tailwind.config.js         # Design System Config
│   └── vite.config.js