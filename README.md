# Leilo Frontend V2

Overhaul of first attempt Leilo-frontend. Using Redux to keep project organized.

# Roadmap

 1. Implement basic structure of backend, sensor firmware, and frontend - **v1.0.0**
  - Backend:
    - Simple access/no access permission system
    - Build atom/group/user model
    - Store user preferences/dashboard
  - Sensor:
    - User configurable
    - Remembers user's settings
    - User can configure through wifi network
    - Auto creation of needed entities
  - Frontend:
    - Displays atoms and group users own
    - Allows user to see atom values and edit
    - User configurable dashboard
        - User can choose and customize widgets to display on dashboard
        
 2. Proper permission system - **v1.2.0**
  - Based on 3 tiers: Owner, Can edit, Can view
    - Tiers inherit permissions from below levels, Edit permssions also gives View permssions. Owner has all 3 permissions
  - Role system for users: Admin and user
    - Should be extensible to more roles
    
 3. Security fixes - **v1.3.0**
  - Escaping: JSON, MySQL, HTML/React (shouldn't need escaping, but be careful)
  - SQL injection test with sqlmap