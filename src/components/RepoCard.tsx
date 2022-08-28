import React, { useState } from 'react';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';
import { IRepo } from "../models/models";

export function RepoCard({ repo }: {repo: IRepo}) {
    const { addFavourites, removeFavourites } = useActions()
    const { favourites } = useAppSelector(state => state.github)

    const [isFav, setIsFav] = useState(favourites.includes(repo.html_url))

    const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
       
        addFavourites(repo.html_url)
        setIsFav(true)
    }

    const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        removeFavourites(repo.html_url)
        setIsFav(false)
    }

    return (
        <div className='border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all'>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
                <h2 className='text-lg font-bold'>{ repo.full_name }</h2>
                <p className='text-sm'>
                    Forks: <span className='fonr-bold mr-2'>{ repo.forks }</span>
                    Watchers: <span className='fonr-bold'>{ repo.watchers }</span>
                </p>
                <p className='text-sm font-thin'>{repo?.description}</p>

                <footer className='mt-4'>
                    {!isFav && <button 
                        className='py-2 px-4 mr-2 bg-yellow-400 rounded hover:shadow-md transition-all'
                        onClick={addToFavourite}
                    >
                        Add
                    </button>}
                    
                    {isFav && <button 
                        className='py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all'
                        onClick={removeFromFavourite}
                    >
                        Remove
                    </button>}
                </footer>
            </a>
        </div>
    )
}
