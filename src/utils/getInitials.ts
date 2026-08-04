// Returns initials from string
export const getInitials = (inputString: string, limit?: number) =>
  inputString
    .split(/\s+/, limit) // Split by whitespace
    .map((word) => word[0]) // Get the first letter of each word
    .join(''); // Join them into a single string
