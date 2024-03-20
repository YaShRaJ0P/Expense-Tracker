import React from 'react'

export const Transactions = () => {
    return (
        <>
            <h1 className='text-white font-black text-6xl flex justify-center pt-7'>Expense Tracker</h1>
            <main className="flex flex-row w-full h-[60vh]  gap-4 items-center justify-center">
                <div className='flex flex-col gap-5 text-white font-bold text-xl'>
                    <label htmlFor="price">Price</label>
                    <label htmlFor="description">Description</label>
                </div>
                <div className='flex flex-col gap-5 text-white font-bold text-xl'>
                    <input type="number" name="price" id="price" />
                    <input type="text" name="description" id="description" />
                </div>
            </main>
        </>
    )
}
