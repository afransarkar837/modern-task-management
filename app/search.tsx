import { useState } from 'react';
import Link from 'next/link';

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

const sampleTasks: Task[] = [
  { id: 1, title: 'Task 1', description: 'Description 1', completed: false },
  { id: 2, title: 'Task 2', description: 'Description 2', completed: true },
  { id: 3, title: 'Task 3', description: 'Description 3', completed: false },
  { id: 4, title: 'Task 4', description: 'Description 4', completed: true },
];


export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(sampleTasks);
  const [sortBy, setSortBy] = useState('title'); // Default sort by title
  const [sortOrder, setSortOrder] = useState('asc'); // Default ascending order

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filtered = sampleTasks.filter((task) =>
      task.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const fieldA = a[sortBy];
    const fieldB = b[sortBy];
    let comparison = 0;
    if (fieldA > fieldB) {
      comparison = 1;
    } else if (fieldA < fieldB) {
      comparison = -1;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      <div className="mb-4">
        <label htmlFor="sortBy">Sort By:</label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={handleSortByChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="title">Title</option>
          <option value="description">Description</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="sortOrder">Sort Order:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortOrderChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id} className="mb-2">
            <Link href={`/task/${task.id}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Completed: {task.completed.toString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}