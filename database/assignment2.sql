-- Insert Tony Stark into the account table
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Update Tony Stark’s account_type to Admin
UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

--Delete Tony Stark’s account
DELETE FROM account
WHERE account_email = 'tony@starkent.com';

-- Update “GM Hummer”
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

--INNER JOIN: Get make, model, and classification for vehicles in the “Sport” category
SELECT i.inv_make, i.inv_model, c.classification_name
FROM inventory i
INNER JOIN classification c
  ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- Updating records in the inventory table
UPDATE inventory
SET 
  inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
  inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');


