/*
  # Initial Schema Setup for GeoExpOre

  1. New Tables
    - `employees`
      - `id` (uuid, primary key)
      - `user_id` (text)
      - `name` (text)
      - `email` (text, unique)
      - `address` (text)
      - `role` (text)
      - `created_at` (timestamp)

    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `commodity` (text)
      - `toposheet_no` (text)
      - `total_area` (numeric)
      - `forest_cover_private` (numeric)
      - `forest_cover_barren` (numeric)
      - `forest_cover_forest` (numeric)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `employee_id` (uuid, foreign key)

    - `project_coordinates`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `name` (text)
      - `latitude` (numeric)
      - `longitude` (numeric)
      - `created_at` (timestamp)

    - `project_files`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `file_type` (text)
      - `file_name` (text)
      - `file_url` (text)
      - `uploaded_at` (timestamp)
      - `uploaded_by` (uuid, foreign key)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  address text,
  role text,
  created_at timestamptz DEFAULT now()
);
 
-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  commodity text,
  toposheet_no text,
  total_area numeric,
  forest_cover_private numeric,
  forest_cover_barren numeric,
  forest_cover_forest numeric,
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  employee_id uuid REFERENCES employees(id)
);

-- Create project_coordinates table
CREATE TABLE IF NOT EXISTS project_coordinates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create project_files table
CREATE TABLE IF NOT EXISTS project_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  file_type text NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  uploaded_at timestamptz DEFAULT now(),
  uploaded_by uuid REFERENCES employees(id)
);

-- Enable Row Level Security
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_coordinates ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_files ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Employees can view their own data"
  ON employees
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Employees can update their own data"
  ON employees
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Employees can view projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Employees can create projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Employees can update their own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (employee_id IN (
    SELECT id FROM employees WHERE user_id = auth.uid()::text
  ));

CREATE POLICY "Employees can view project coordinates"
  ON project_coordinates
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Employees can manage project coordinates"
  ON project_coordinates
  FOR ALL
  TO authenticated
  USING (project_id IN (
    SELECT id FROM projects WHERE employee_id IN (
      SELECT id FROM employees WHERE user_id = auth.uid()::text
    )
  ));

CREATE POLICY "Employees can view project files"
  ON project_files
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Employees can manage project files"
  ON project_files
  FOR ALL
  TO authenticated
  USING (project_id IN (
    SELECT id FROM projects WHERE employee_id IN (
      SELECT id FROM employees WHERE user_id = auth.uid()::text
    )
  ));