# MonogoTasks

IN ORDER TO RUN TEST PLEASE TYPE IN TERMINAL:
 npx playwright test   
TO SHOW RESULTS:
 npx playwright show-report 

Test Case 1:
Verify if it is possible to add a product to the cart.
Test Steps:

Visit the Ploom website: Ploom Website: Buy Heated Tobacco Products, Devices and Kits.
Click on "Shop".
Open the product page by SKU (find the element with data-sku="<>" in the DOM. As a test, you can use 'ploom-x-advanced').
Add the product to the cart.
Check your basket count.
Open the basket.
Check if the product is in the basket.

Results:
![image](https://github.com/user-attachments/assets/c10b34d1-b47a-4c7e-b75d-94586be360b9)
![image](https://github.com/user-attachments/assets/6260cb81-06d8-40a5-b1cf-8c9c86785e44)

Test Case 2:
Verify if it is possible to remove a product from the cart.
Precondition: A product is already in the cart.
Test Steps:

Open the cart.
Remove the product from the cart.
Verify that the product is no longer in the cart.
Check if the basket count is updated correctly.

Results:
![image](https://github.com/user-attachments/assets/f0f9348b-324d-4a09-8f4f-ee28aaff9e8a)

Test Case 3:
Verify if there are any broken links or images on the product page.
Test Steps:

Visit the Ploom website: Ploom Website: Buy Heated Tobacco Products, Devices and Kits.
Click on "Shop".
Open the product page by SKU (find the element with data-sku="<>" in the DOM. As a test, you can use 'ploom-x-advanced').
Check all links on the product page to ensure they are not broken.
Verify that all images on the product page load correctly.

Results:
![image](https://github.com/user-attachments/assets/0cee7504-bea1-46b7-90a1-2f36849c9a4e)


NOTE: I did all tests only in chrome, I know ideally it should be also tested on other websites :)


