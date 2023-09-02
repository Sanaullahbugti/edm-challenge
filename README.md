# EDM Frontend Task

## Description
The project showcases a frontend implementation with an emphasis on user authentication and data representation. 

- **Login System**: Utilizes Redux Toolkit to manage and store user details, allowing seamless access across all components. Given the absence of an appropriate open login library, the credentials are hard-coded within the `userSlice`. The system also includes error handling and password validation mechanisms.
  
- **User Interface**: Upon successful login, users are greeted with a structured sidebar containing disabled menu items. The main content area exhibits a table populated with data sourced from the [balldontlie.io API](https://www.balldontlie.io/api/v1/players). Notably, a search feature with debouncing is integrated, offering a refined user experience. Pagination is also available for data navigation.

**Node Version**: `v16.20.2`  
**NPM Version**: `8.19.4`

## How to Run

1. First, clone the repository: 
    ```bash
   git clone https://github.com/Sanaullahbugti/edm-challenge.git
    ```

2. Change your directory to the cloned repository's main folder:
    ```bash
    cd edm-challenge
    ```

3. Install the required packages:
    ```bash
    npm install
    ```

4. Start the application:
    ```bash
    npm start
    ```

## Login Credentials

For **Viewer** access:
- **Username**: `SampleViewer`
- **Password**: `ViewerPass$1`

For **Editor** access:
- **Username**: `SampleEditor`
- **Password**: `EditorPass$1`
