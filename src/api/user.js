// Simulate a server update
export const updateProfile = async (formData) => {
    console.log("💾 Sending update to server...", formData);

    // Simulate network delay (1 second)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate a random server error (10% chance) to test error handling
    if (Math.random() < 0.1) {
        throw new Error("Server rejected the update (Random 500 Error)");
    }

    return { success: true, updatedData: formData };
};