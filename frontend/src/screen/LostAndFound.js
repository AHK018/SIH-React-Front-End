import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell } from 'recharts';
import photo from '../asset/arrivaIcon.png';
import Topbar from '../component/Topbar';

export default function LostAndFound() {
    return (
        <div className="flex flex-col h-screen">
            <Topbar></Topbar>
            <div className="grid grid-cols-3 w-full h-20">
                <div className="w-full h-full pl-8 flex items-center">
                    <Link to="/"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15l-6-6 6-6M3 9h12a6 6 0 010 12H3z" />
                        </svg>
                    </Link>
                </div>
                <div className="w-full h-full flex items-center justify-center relative">
                    <form className="relative">
                        <input
                            className="py-2 pl-4 w-96 h-12 rounded-3xl border-solid border-2 border-gray-400 focus:outline-none bg-transparent"
                            type="text"
                            placeholder="Search"
                        />
                        <button
                            className="bg-teal-400 duration-1000 hover:bg-teal-500 hover:shadow-lg hover:shadow-teal-500/50 absolute right-1 top-1 h-10 rounded-full w-16 flex items-center justify-center"
                            type="submit"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>

                        </button>
                    </form>
                </div>
                <div className="w-full h-full flex items-center justify-end pr-8">
                    <select
                        className="h-12 px-4 border-solid border-white rounded-3xl bg-transparent w-32 border-0 focus:outline-none"
                        name="year"
                        id="year"
                    >
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
            </div>
            <div className="flex-1 w-full px-4 py-4">
                <div className="grid gap-4 grid-cols-3 w-full h-full rounded-3xl px-4 py-4">
                    <div className="col-span-1 grid grid-rows-7 bg-white backdrop-blur-md bg-blur-md bg-opacity-30 border-solid border-white border-t-2 border-l-2 w-full h-full rounded-3xl">
                        <div className="row-span-1 w-full h-full rounded-3xl flex items-center justify-center">
                            <h className="text-xl tracking-widest bg-black text-white px-4 rounded-xl h-8">Register Complent</h>
                        </div>
                        <div className="row-span-6 w-full h-full rounded-3xl">
                            <form className="grid grid-rows-6 w-full h-full rounded-b-3xl">
                                <div className="grid grid-cols-2 w-full h-full row-span-5">
                                    <div className="grid grid-rows-3 w-full h-full">
                                        <div className="w-full h-full flex items-center justify-center">
                                            <input
                                                className="py-2 pl-4 w-56 h-12 rounded-3xl border-solid border-2 border-gray-400 focus:outline-none bg-transparent"
                                                type="text"
                                                placeholder="Owner Name"
                                            />
                                        </div>
                                        <div className="w-full h-full flex items-center justify-center">
                                            <input
                                                className="py-2 pl-4 w-56 h-12 rounded-3xl border-solid border-2 border-gray-400 focus:outline-none bg-transparent"
                                                type="text"
                                                placeholder="Contact Number"
                                            />
                                        </div>
                                        <div className="w-full h-full flex items-center justify-center">
                                            <select
                                                className="py-2 pl-4 w-56 h-12 rounded-3xl border-solid border-2 border-gray-400 focus:outline-none bg-transparent"
                                                name="Property Type"
                                                id="Type"
                                            >
                                                <option value="2022">Property Type</option>
                                                <option value="2023">2023</option>
                                                <option value="2024">2024</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-rows-3 w-full h-full">
                                        <div className="w-full h-full flex items-center justify-center">
                                            <input
                                                className="py-2 pl-4 w-56 h-12 rounded-3xl border-solid border-2 border-gray-400 focus:outline-none bg-transparent"
                                                type="text"
                                                placeholder="Train Name"
                                            />
                                        </div>
                                        <div className="w-full h-full flex items-center justify-center">
                                            <input
                                                className="py-2 pl-4 w-56 h-12 rounded-3xl border-solid border-2 border-gray-400 focus:outline-none bg-transparent"
                                                type="text"
                                                placeholder="Station Name"
                                            />
                                        </div>
                                        <div className="w-full h-full flex items-center justify-center">
                                            <input
                                                className="py-2 pl-4 w-56 h-12 rounded-3xl border-solid border-2 border-gray-400 focus:outline-none bg-transparent"
                                                type="date"
                                                placeholder="Lost Date"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-full bg-transparent row-span-1 rounded-b-3xl flex justify-end">
                                    <button type="submit" className="hover:shadow-lg hover:shadow-lime-500/50 hover:bg-lime-300 duration-1000 w-24 flex items-center justify-center h-18 rounded-br-3xl">Register<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                    </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-span-2 grid gap-4 grid-rows-2 w-full h-full rounded-3xl">
                        <div className="grid gap-4 grid-cols-2 w-full h-full rounded-3xl">
                            <div className="bg-white backdrop-blur-md bg-blur-md bg-opacity-30 border-solid border-white border-t-2 border-l-2 w-full h-full rounded-3xl grid grid-rows-5">
                                <div className="w-full h-full row-span-1 rounded-3xl flex justify-center items-center"><h className="text-xl tracking-widest bg-black text-white px-4 rounded-xl h-8">Found Items</h></div>
                                <div className="w-full h-full row-span-4 rounded-3xl flex justify-center items-center">
                                    <PieChart width={200} height={200}>
                                        <Pie
                                            data={[
                                                { name: 'Category A', value: 30 },
                                                { name: 'Category B', value: 20 },
                                                { name: 'Category C', value: 50 },
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            <Cell fill="#82ca9d" />
                                            <Cell fill="#ffc658" />
                                            <Cell fill="#FF5733" />
                                        </Pie>
                                    </PieChart></div>
                            </div>
                            <div className="bg-white backdrop-blur-md bg-blur-md bg-opacity-30 border-solid border-white border-t-2 border-l-2 w-full h-full rounded-3xl grid grid-rows-5">
                                <div className="w-full h-full row-span-1 rounded-3xl flex justify-center items-center"><h className="text-xl tracking-widest bg-black text-white px-4 rounded-xl h-8">Lost Items Inquiry</h></div>
                                <div className="w-full h-full row-span-4 rounded-3xl flex justify-center items-center">
                                    <PieChart width={200} height={200}>
                                        <Pie
                                            data={[
                                                { name: 'Category A', value: 30 },
                                                { name: 'Category B', value: 20 },
                                                { name: 'Category C', value: 50 },
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            <Cell fill="#82ca9d" />
                                            <Cell fill="#ffc658" />
                                            <Cell fill="#FF5733" />
                                        </Pie>
                                    </PieChart></div>
                            </div>
                        </div>
                        <div className="grid grid-rows-5 bg-white backdrop-blur-md bg-blur-md bg-opacity-30 border-solid border-white border-t-2 border-l-2 w-full h-full rounded-3xl">
                            <div className="row-span-1 w-full h-full rounded-3xl flex items-center justify-center">
                                <h className="text-xl tracking-widest bg-black text-white px-4 rounded-xl h-8">Lost and Found Items</h>
                            </div>
                            <div className="row-span-4 w-full h-full px-4 rounded-b-3xl">
                                <div className="w-full h-52 rounded-b-3xl overflow-y-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr>
                                                <th className="py-2 px-4">Product</th>
                                                <th className="py-2 px-4">Id</th>
                                                <th className="py-2 px-4">Recovery Date</th>
                                                <th className="py-2 px-4">Recovered From</th>
                                                <th className="py-2 px-4">Owner Name</th>
                                                <th className="py-2 px-4">Cutody Detail</th>
                                                <th className="py-2 px-4">Property Image</th>
                                                <th className="py-2 px-4">Contact No.</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-solid border-white border-t-2">
                                                <td className="py-2 px-4">Iphone 14</td>
                                                <td className="py-2 px-4">1264</td>
                                                <td className="py-2 px-4">07-12-2023</td>
                                                <td className="py-2 px-4">Charholi</td>
                                                <td className="py-2 px-4">Ramu</td>
                                                <td className="py-2 px-4">LPO</td>
                                                <td className="py-2 px-4">
                                                    <img src={photo} className="rounded-full w-12 h-12"></img>
                                                </td>
                                                <td className="py-2 px-4">9876543210</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="blob w-[800px] h-full rounded-[999px] absolute top-0 right-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"></div>
            <div className="blob w-[1000px] h-full rounded-[999px] absolute bottom-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-red-200 via-gray-100 to-blue-100"></div>
            <div className="blob w-[600px] h-full rounded-[999px] absolute bottom-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-slate-100 via-teal-100 to-blue-100"></div>
            <div className="blob w-[300px] h-full rounded-[999px] absolute bottom-[-10px] left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-green-200 via-cyan-200 to-Fuchsia-300"></div>

        </div>
    );
}
