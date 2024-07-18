const API_URL = 'http://localhost:3000';

export const getAvailableRooms = async () => {
    const response = await fetch(`${API_URL}/rooms`);
    return response.json();
}

export const getPostRequestForRoomReservation = (form: { name: string; phone: string }) => {
    return fetch(`${API_URL}/orders`, {
        method: 'POST',
        body: JSON.stringify(form),
    });
}