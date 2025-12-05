'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BecomeGuide() {
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [languages, setLanguages] = useState('')
    const [expertise, setExpertise] = useState('')
    const [dailyRate, setDailyRate] = useState(50)
    const router = useRouter()

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        // POST to /api/guides or /api/users with role=guide
        alert('Your guide profile request has been submitted!')
        router.push('/')
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-lg">
            <h2 className="text-2xl font-bold">Become a Guide</h2>
            <p className="mt-2 text-gray-600">Share your city, your passions, and earn by hosting experiences.</p>
            <form onSubmit={submit} className="mt-6 space-y-4">
                <div>
                    <label className="block text-sm font-semibold">Full Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="w-full p-3 border rounded mt-1" required />
                </div>
                <div>
                    <label className="block text-sm font-semibold">Bio</label>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself" className="w-full p-3 border rounded mt-1" rows={4} required />
                </div>
                <div>
                    <label className="block text-sm font-semibold">Languages Spoken</label>
                    <input type="text" value={languages} onChange={(e) => setLanguages(e.target.value)} placeholder="English, Spanish" className="w-full p-3 border rounded mt-1" required />
                </div>
                <div>
                    <label className="block text-sm font-semibold">Expertise / Tour Categories</label>
                    <input type="text" value={expertise} onChange={(e) => setExpertise(e.target.value)} placeholder="Food, History, Nightlife" className="w-full p-3 border rounded mt-1" required />
                </div>
                <div>
                    <label className="block text-sm font-semibold">Daily Rate ($)</label>
                    <input type="number" value={dailyRate} onChange={(e) => setDailyRate(Number(e.target.value))} min={10} className="w-full p-3 border rounded mt-1" required />
                </div>
                <button type="submit" className="w-full p-3 bg-indigo-600 text-white rounded mt-2">Submit Application</button>
            </form>
        </div>
    )
}