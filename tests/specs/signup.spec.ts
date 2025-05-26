import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/signupPage';

test.describe('Signup Test Suite', () => {
  const validName = 'Test User';
  const validEmail = `testuser+${Date.now()}@example.com`;
  const validPassword = 'Welcome@123';

  test('Signup with valid credentials', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.fillForm(validName, validEmail, validPassword, validPassword);
    await signupPage.submit();
    await signupPage.assertRedirectToCheckMail(validEmail);
  });

  test('Signup fails with invalid email format', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.fillForm(validName, 'bademail', validPassword, validPassword);
    await signupPage.submit();
    await signupPage.assertValidationError('invalid email');
  });

  test('Signup fails with mismatched passwords', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.fillForm(validName, validEmail, validPassword, 'Wrong@123');
    await signupPage.submit();
    await signupPage.assertValidationError('passwords do not match');
  });

  test('Signup fails with blank fields', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.fillForm('', '', '', '');
    await signupPage.submit();
    await signupPage.assertValidationError('required');
  });

  test('Signup fails if terms not accepted', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.fillForm(validName, validEmail, validPassword, validPassword, false);
    await signupPage.submit();
    await signupPage.assertValidationError('agree to the terms');
  });

  test('Signup fails for already registered email', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.fillForm(validName, process.env.TEST_EMAIL!, validPassword, validPassword);
    await signupPage.submit();
    await signupPage.assertValidationError('already registered');
  });

  test('Signup fails with weak password', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.fillForm(validName, validEmail, '12345', '12345');
    await signupPage.submit();
    await signupPage.assertValidationError('weak password');
  });

  test('Signup fails with password under 8 characters', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.fillForm(validName, validEmail, 'Ab@1', 'Ab@1');
    await signupPage.submit();
    await signupPage.assertValidationError('minimum of 8 characters');
  });

  test('Signup fails with password missing uppercase letter', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.fillForm(validName, validEmail, 'welcome@123', 'welcome@123');
    await signupPage.submit();
    await signupPage.assertValidationError('uppercase letter');
  });

  test('Signup fails with password missing lowercase letter', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.fillForm(validName, validEmail, 'WELCOME@123', 'WELCOME@123');
    await signupPage.submit();
    await signupPage.assertValidationError('lowercase letter');
  });

  test('Signup fails with password missing special character', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.fillForm(validName, validEmail, 'Welcome123', 'Welcome123');
    await signupPage.submit();
    await signupPage.assertValidationError('special character');
  });

  test('Signup fails with name containing special characters', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.fillForm('@User*!', validEmail, validPassword, validPassword);
    await signupPage.submit();
    await signupPage.assertValidationError('invalid name');
  });

  test('Signup fails when email contains spaces', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.fillForm(validName, 'test user@example.com', validPassword, validPassword);
    await signupPage.submit();
    await signupPage.assertValidationError('invalid email');
  });

  test('Signup fails with password same as email', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const sameAsEmail = `testuser+${Date.now()}@example.com`;
    await signupPage.goto();
    await signupPage.fillForm(validName, sameAsEmail, sameAsEmail, sameAsEmail);
    await signupPage.submit();
    await signupPage.assertValidationError('password must not be the same as email');
  });

  test('Signup fails without marketing opt-in', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const uniqueEmail = `testuser+${Date.now()}@example.com`;
    await signupPage.goto();
    await signupPage.fillForm(validName, uniqueEmail, validPassword, validPassword, true, false);
    await signupPage.submit();
    await signupPage.assertRedirectToCheckMail(uniqueEmail);
  });
  
  
});



// import { test, expect } from '@playwright/test';
// import { SignupPage } from '../pages/signupPage';

// test.describe('Signup Test Suite', () => {
//   const validName = 'Test User';
//   const validEmail = `testuser+${Date.now()}@example.com`;
//   const validPassword = 'Welcome@123';

//   test('Signup with valid credentials', async ({ page }) => {
//     const signupPage = new SignupPage(page);
//     await signupPage.goto();
//     await signupPage.fillForm(validName, validEmail, validPassword, validPassword);
//     await signupPage.submit();
//     await signupPage.assertRedirectToCheckMail(validEmail);
//   });

//   test('Signup fails with invalid email format', async ({ page }) => {
//     const signupPage = new SignupPage(page);
//     await signupPage.goto();
//     await signupPage.fillForm(validName, 'bademail', validPassword, validPassword);
//     await signupPage.submit();
//     await signupPage.assertValidationError('invalid email');
//   });

//   test('Signup fails with mismatched passwords', async ({ page }) => {
//     const signupPage = new SignupPage(page);
//     await signupPage.goto();
//     await signupPage.fillForm(validName, validEmail, validPassword, 'Wrong@123');
//     await signupPage.submit();
//     await signupPage.assertValidationError('passwords do not match');
//   });

//   test('Signup fails with blank fields', async ({ page }) => {
//     const signupPage = new SignupPage(page);
//     await signupPage.goto();
//     await signupPage.fillForm('', '', '', '');
//     await signupPage.submit();
//     await signupPage.assertValidationError('required');
//   });

//   test('Signup fails if terms not accepted', async ({ page }) => {
//     const signupPage = new SignupPage(page);
//     await signupPage.goto();
//     await signupPage.fillForm(validName, validEmail, validPassword, validPassword, false);
//     await signupPage.submit();
//     await signupPage.assertValidationError('agree to the terms');
//   });

//   test('Signup fails for already registered email', async ({ page }) => {
//     const signupPage = new SignupPage(page);
//     await signupPage.goto();
//     await signupPage.fillForm(validName, process.env.TEST_EMAIL!, validPassword, validPassword);
//     await signupPage.submit();
//     await signupPage.assertValidationError('already registered');
//   });
// });
