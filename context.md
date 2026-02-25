PROJECT CONTEXT: RefuConnect
1. Project Overview
Name: RefuConnect
Type: Web Application for Animal Shelter Management (Refuge Animalier).
Architecture: Decoupled (Headless).
Frontend: React.js (Vite) + Tailwind CSS (SPA).
Backend: Laravel 11 (API RESTful).
Database: MySQL.
Goal: Manage animals, adoptions, donations, grooming services (toilettage), and breeding matching (couplage) for a shelter.
2. Design System & UI Identity (Strict Adherence)
Typography:
Headings: Playfair Display (Serif, elegant).
Body: Inter (Sans-serif, clean).
Color Palette:
Background: #FDF8F5 (Soft Beige/Cream).
Primary Action: #E67E22 (Warm Orange).
Secondary: #F5B041 (Gold/Yellow).
Text: #2C3E50 (Dark Charcoal).
UI Elements:
Rounded corners (rounded-2xl).
Soft shadows (shadow-soft).
Cards with floating effects.
3. Database Schema (MySQL)
The system relies on these core entities (based on UML):
Users (users)
id, name, email, password
role: ENUM('admin', 'user', 'livreur')
Animals (animals)
id, name, species (Chat, Chien), race (Labrador, Siamois...), age, sex (Male, Female).
photo (path string).
status: ENUM('disponible', 'adopte', 'en_soins').
Adoptions (adoptions)
id, user_id, animal_id, date.
status: ENUM('en_attente', 'validee', 'refusee', 'livree').
Business Rule: Includes delivery assignment logic.
Grooming (reservations_toilettage)
id, user_id, animal_name (visitor's pet), service_type (bain, tonte, complet).
date, status (en_attente, confirme, termine).
Breeding/Coupling (couplages_races)
id, male_animal_id, female_animal_id.
price (breeding fee).
status (en_attente, confirme).
Business Rule: Matches must be same species, opposite sex.
Donations (dons)
id, type (financier, nourriture, materiel).
amount (for money) or description (for items).
status (promesse, recu).
4. Functional Requirements (The "Bricks")
Public (Frontend - React)
Home: Hero section, Featured animals.
Animal Gallery: Grid view with filters (Species, Age, Race).
Animal Detail: Photos, Description, "Adopt" button.
Services:
Toilettage: Booking form for pet owners.
Couplage: Search for a mate for a pet (filtered by race), paid service.
Dons: Donation forms (Money simulator, Material pledge).
Auth: Login/Register (JWT).
Admin (Backend - Laravel API)
Dashboard: Statistics (Adoptions this month, Revenue from breeding).
CRUD: Full management of Animals.
Workflow:
Validate/Refuse Adoption requests.
Assign "Livreur" (Driver) to approved adoptions.
Update Grooming statuses.
Validate Breeding matches and payments.
5. Technical Constraints & Rules
API Communication: Axios with Interceptors.
State Management: React Context or Zustand for Auth.
CSS Class Management: Use clsx and tailwind-merge (via cn() helper).
Images: Stored in storage/app/public, served via symbolic link.
Validation: Strict Laravel FormRequest validation on the backend.
Routing: React Router v6 with Protected Routes for Admin/User roles.
6. Current Directory Structure
Root: /RefuConnect
/frontend: React + Vite application.
/backend: Laravel application.
Frontend Path Alias: @/ points to src/.
Backend API Prefix: /api/v1 (Recommended).
INSTRUCTION TO AI:
When reviewing code, always strictly follow the Design System (colors/fonts) and the Database Schema defined above. Do not hallucinate fields that are not in the spec.