export default function formatDate(dateString) {
    // Given date string

    // Create a new Date object with the given date string
    const date = new Date(dateString);

    // Define options for formatting the date
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC'
    };

    // Format the date using the toLocaleString() method with the options
    return date.toLocaleString('en-US', options);

}



//   // Example usage:
//   const dateString = "2024-04-02T16:15:38.251Z";
//   const formattedDateTime = formatDate(dateString);
//   console.log(formattedDateTime); // Output: "02-04-2024 4:15:38 PM"
