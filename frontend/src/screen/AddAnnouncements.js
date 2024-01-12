import React, { useState } from 'react';
import axios from 'axios';

const path = 'http://127.0.0.1:5000'
function AddAnnouncements() {
    const [announcement, setAnnouncement] = useState({
        station_code: '',
        station_name: '',
        announcement_text: '',
        announcement_time: '',
        isurgent: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${path}/add_announcement`, announcement);
            alert('submitted data:', response.data)
            console.log(response.data); // Log the response from the backend
            // Optionally, handle success scenarios
        } catch (error) {
            console.error('Error:', error);
            // Handle error scenarios
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnnouncement({ ...announcement, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label htmlFor="station_code" className="block text-gray-700 font-semibold mb-2">Station Code</label>
                <input type="text" id="station_code" name="station_code" value={announcement.station_code} onChange={handleChange} className="border-gray-300 rounded-md border px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
                <label htmlFor="station_name" className="block text-gray-700 font-semibold mb-2">Station Name</label>
                <input type="text" id="station_name" name="station_name" value={announcement.station_name} onChange={handleChange} className="border-gray-300 rounded-md border px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
                <label htmlFor="announcement_text" className="block text-gray-700 font-semibold mb-2">Announcement Text</label>
                <textarea id="announcement_text" name="announcement_text" value={announcement.announcement_text} onChange={handleChange} className="border-gray-300 rounded-md border px-3 py-2 w-full focus:outline-none focus:border-blue-500"></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="announcement_time" className="block text-gray-700 font-semibold mb-2">Announcement Time</label>
                <input type="date" id="announcement_time" name="announcement_time" value={announcement.announcement_time} onChange={handleChange} className="border-gray-300 rounded-md border px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
                <label htmlFor="isurgent" className="block text-gray-700 font-semibold mb-2">Is Urgent?</label>
                <input type="text" id="isurgent" name="isurgent" value={announcement.isurgent} onChange={handleChange} className="border-gray-300 rounded-md border px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Add Announcement</button>
        </form>
    );
}

export default AddAnnouncements;
