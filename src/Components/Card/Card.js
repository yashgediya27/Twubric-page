import React, { useEffect, useState } from 'react'
import DateFilter from '../DateFilter/DateFilter';
import TwubricScoreTable from '../TwubricScoreTable/TwubricScoreTable';
import data from '../JSON/data.json'

const Card = () => {
    const [followers, setFollowers] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sortingOrder, setSortingOrder] = useState({})

    useEffect(() => {
        setFollowers(data)
    }, [])

    const handleSort = (criteria) => {
        const sortedFollowersCopy = [...followers];
        const isAscending = sortingOrder[criteria] === 'asc';
        sortedFollowersCopy.sort((a, b) => {
            let comparison = 0;

            if (criteria === 'Twubric Score') {
                comparison = a.twubric.total - b.twubric.total;
            } else if (criteria === 'Friends') {
                comparison = a.twubric.friends - b.twubric.friends;
            } else if (criteria === 'Influence') {
                comparison = a.twubric.influence - b.twubric.influence;
            } else if (criteria === 'Chirpiness') {
                comparison = a.twubric.chirpiness - b.twubric.chirpiness;
            }
            return isAscending ? comparison : -comparison;
        });

        const newSortingOrder = { ...sortingOrder };
        newSortingOrder[criteria] = isAscending ? 'desc' : 'asc';
        setSortingOrder(newSortingOrder);
        setFollowers(sortedFollowersCopy);
    };

    const handleDateFilter = () => {
        const filteredFollowers = data.filter((d) => {
            const abc = new Date(d.join_date).toDateString();
            const startDate1 = new Date(startDate).toDateString();
            const endDate1 = new Date(endDate).toDateString();

            return (
                new Date(abc).getTime() >= new Date(startDate1).getTime() &&
                new Date(abc).getTime() <= new Date(endDate1).getTime()
            );
        });
        setFollowers(filteredFollowers);
    };


    const handleRemoveFollower = (followerId) => {
        const updatedFollowers = followers.filter((follower) => follower.uid !== followerId);
        setFollowers(updatedFollowers);
        setFollowers(updatedFollowers);
    };


    return (
        <div className='sm:px-5 px-4'>
            <h1 className='text-center my-10 text-2xl font-bold text-blue-400'>Twitter Follower Analysis</h1>
            <div className='flex md:justify-end items-center'>
                <DateFilter
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    handleDateFilter={handleDateFilter}
                />
            </div>
            <TwubricScoreTable
                followers={followers}
                handleSort={handleSort}
                handleRemoveFollower={handleRemoveFollower}
            />

        </div>
    )
}

export default Card