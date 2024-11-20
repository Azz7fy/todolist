'use client';

import React, { useState } from 'react';

export default function TodoList() {
	const [lists, setLists] = useState({ Default: [] });
	const [activeTab, setActiveTab] = useState('Default');
	const [input, setInput] = useState('');
	const [date, setDate] = useState('');
	const [priority, setPriority] = useState('Medium');

	const addItem = (type) => {
		if (input.trim()) {
			if (type === 'list') {
				setLists((prev) => ({ ...prev, [input]: [] }));
				setActiveTab(input);
			} else {
				const newTodo = {
					id: Date.now(),
					text: input,
					done: false,
					date,
					priority,
				};
				setLists((prev) => ({
					...prev,
					[activeTab]: [...prev[activeTab], newTodo],
				}));
			}
			setInput('');
			setDate('');
			setPriority('Medium');
		}
	};

	const toggleDone = (id) => {
		setLists((prev) => ({
			...prev,
			[activeTab]: prev[activeTab].map((item) =>
				item.id === id ? { ...item, done: !item.done } : item
			),
		}));
	};

	const removeItem = (id) => {
		setLists((prev) => ({
			...prev,
			[activeTab]: prev[activeTab].filter((item) => item.id !== id),
		}));
	};

	return (
		<div className='max-w-3xl mx-auto mt-8 p-6 border border-black'>
			<h1 className='text-2xl font-bold mb-4'>Hudson's Todo List</h1>

			<div className='flex mb-4 overflow-x-auto'>
				{Object.keys(lists).map((list) => (
					<button
						key={list}
						onClick={() => setActiveTab(list)}
						className={`px-3 py-1 mr-2 ${
							activeTab === list
								? 'bg-black text-white'
								: 'bg-white text-black border border-black'
						}`}
					>
						{list}
					</button>
				))}
			</div>

			<div className='flex flex-col space-y-2 mb-4'>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder='New item or list'
					className='px-3 py-2 border border-black'
				/>
				<input
					type='date'
					value={date}
					onChange={(e) => setDate(e.target.value)}
					className='px-3 py-2 border border-black'
				/>
				<select
					value={priority}
					onChange={(e) => setPriority(e.target.value)}
					className='px-3 py-2 border border-black'
				>
					<option value='Low'>Low Priority</option>
					<option value='Medium'>Medium Priority</option>
					<option value='High'>High Priority</option>
				</select>
				<div className='flex space-x-2'>
					<button
						onClick={() => addItem('item')}
						className='px-4 py-2 bg-black text-white'
					>
						Add Item
					</button>
					<button
						onClick={() => addItem('list')}
						className='px-4 py-2 bg-white text-black border border-black'
					>
						Add List
					</button>
				</div>
			</div>

			<ul className='space-y-2'>
				{lists[activeTab].map((item) => (
					<li
						key={item.id}
						className='flex items-center space-x-2 border-b border-gray-200 py-2'
					>
						<input
							type='checkbox'
							checked={item.done}
							onChange={() => toggleDone(item.id)}
							className='w-4 h-4 border-black'
						/>
						<span
							className={`flex-grow ${
								item.done ? 'line-through' : ''
							}`}
						>
							{item.text}
						</span>
						<span className='text-sm'>
							{item.date} | {item.priority}
						</span>
						<button
							onClick={() => removeItem(item.id)}
							className='px-2 py-1 text-xs border border-black'
						>
							Remove
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
