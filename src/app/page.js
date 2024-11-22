'use client';

import React, { useState } from 'react';

export default function TodoList() {
	const [lists, setLists] = useState({ Default: [] });
	const [activeTab, setActiveTab] = useState('Default');
	const [input, setInput] = useState('');
	const [date, setDate] = useState('');
	const [priority, setPriority] = useState('Medium');
	const [isSorted, setIsSorted] = useState(false);


	// creates function for adding an item each time the button is clicked
	const addItem = (type) => {
		if (input.trim()) {
			if (type === 'list') {
				setLists((prev) => ({ ...prev, [input]: [] }));
				setActiveTab(input);
			} else {
				// Data constructor for each new todo
				const newTodo = {
					id: Date.now(),
					text: input,
					done: false,
					date,
					priority,
				};
				// SORTS LISTS THROUGH PREVIOUS TODO BY DATE COLUMN
				setLists((prev) => {
					const updatedList = [...prev[activeTab], newTodo];
					updatedList.sort((a, b) => new Date(a.date) - new Date(b.date));
					return { ...prev, [activeTab]: updatedList };
				});
			}
			// sets the default inputs or placeholders
			setInput('');
			setDate('');
			setPriority('Medium');
		}
	};

	// When you click done, appends it to the list for the current tab (activeTab)
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

	const toggleSort = () => {
		setIsSorted((prev) => !prev);
	};

	// body of the website and  UI

	return (
		<div className='max-w-3xl mx-auto mt-8 p-6 border border-black'>
			<h1 className='text-2xl font-bold mb-4'>Hudson's Super duper epic todo list</h1>

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
				{lists[activeTab] //displays the lists inside active tab and checks the sorting
					.sort((a, b) => isSorted ? new Date(a.date) - new Date(b.date) : 0)
					.map((item) => {
						// Check if the current date is past the item's date
						const isOverdue = new Date(item.date) < new Date(); // true if the item is overdue
						const isDone = item.done; // less copy paste
						return (
							<li
								key={item.id}
								className={`flex items-center justify-between border-b border-gray-200 py-4 px-2 ${isDone ? 'bg-gray-300 text-gray-500' : ''}`}
							>
								<div className='flex items-center space-x-2 flex-grow'>
									<label className='flex items-center cursor-pointer'>
										<input
											type='checkbox'
											checked={isDone}
											onChange={() => toggleDone(item.id)}
											className='hidden'
										/>
										<div className={`w-4 h-4 border-2 rounded ${isDone ? 'bg-green-500 border-green-500' : 'border-black'} flex items-center justify-center`}>
											{isDone && <span className='text-white'>&#10003;</span>}
										</div>
									</label>
									<span className={`flex-grow ${isDone ? 'line-through' : ''}`}>
										{item.text}
									</span>
									<span className={`px-2 py-1 rounded border ${item.priority === 'High' ? 'bg-red-500 text-white' : item.priority === 'Medium' ? 'bg-yellow-500 text-black' : 'bg-green-500 text-white'} ${isDone ? 'opacity-50' : ''}`}>
										{item.priority}
									</span>
									{/* Display "Overdue" if the item is past its due date */}
									{isOverdue && <span className={`text-red-500 font-bold ${isDone ? 'opacity-50' : ''}`}>OVER TIME</span>}
								</div>
								<span className={`ml-4 text-sm p-2 ${isDone ? 'opacity-50' : ''}`}>
									{item.date}
								</span>
								<button
									onClick={() => removeItem(item.id)}
									className={`ml-2 text-black border-none bg-transparent hover:text-red-500 ${isDone ? 'opacity-50' : ''}`}
									aria-label='Remove item'
								>
									<span className='text-xl'>&times;</span>
								</button>
							</li>
						);
					})}
			</ul>
		</div>
	);
}
