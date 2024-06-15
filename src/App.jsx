// import { useState } from 'react';
// import './App.css';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// function App() {
//   const [columns, setColumns] = useState([
//     { id: 'id', headerName: 'ID', editable: false, filter: '', sort: null },
//     { id: 'firstName', headerName: 'First name', editable: true, filter: '', sort: null },
//     { id: 'lastName', headerName: 'Last name', editable: true, filter: '', sort: null },
//     { id: 'age', headerName: 'Age', editable: true, filter: '', sort: null },
//     { id: 'fullName', headerName: 'Full name', editable: false, filter: '', sort: null },
//   ]);

//   const [rows, setRows] = useState([
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 30 },
//     { id: 6, lastName: 'Melisandre', firstName: 'Melisandre', age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   ]);

//   const [newRow, setNewRow] = useState({
//     id: rows.length + 1,
//     firstName: '',
//     lastName: '',
//     age: '',
//   });

//   const handleEditCell = (id, field, value) => {
//     setRows(rows.map(row => (row.id === id ? { ...row, [field]: value } : row)));
//   };

//   const handleEditHeader = (id, value) => {
//     setColumns(columns.map(col => (col.id === id ? { ...col, headerName: value } : col)));
//   };

//   const handleAddColumn = () => {
//     const newColumn = { id: `col${columns.length + 1}`, headerName: 'New Column', editable: true, filter: '', sort: null };
//     setColumns([...columns, newColumn]);
//   };

//   const handleDragEnd = result => {
//     if (!result.destination) return;

//     const newColumns = Array.from(columns);
//     const [moved] = newColumns.splice(result.source.index, 1);
//     newColumns.splice(result.destination.index, 0, moved);

//     setColumns(newColumns);
//   };

//   const toggleColumnVisibility = id => {
//     setColumns(columns.map(col => col.id === id ? { ...col, hidden: !col.hidden } : col));
//   };

//   const handleFilterChange = (id, value) => {
//     setColumns(columns.map(col => (col.id === id ? { ...col, filter: value } : col)));
//   };

//   const handleSort = id => {
//     const newColumns = columns.map(col => {
//       if (col.id === id) {
//         return { ...col, sort: col.sort === 'asc' ? 'desc' : 'asc' };
//       }
//       return { ...col, sort: null };
//     });
//     setColumns(newColumns);

//     const sortedRows = [...rows].sort((a, b) => {
//       if (a[id] < b[id]) return newColumns.find(col => col.id === id).sort === 'asc' ? -1 : 1;
//       if (a[id] > b[id]) return newColumns.find(col => col.id === id).sort === 'asc' ? 1 : -1;
//       return 0;
//     });

//     setRows(sortedRows);
//   };

//   const filteredRows = rows.filter(row => {
//     return columns.every(col => {
//       if (!col.filter) return true;
//       return row[col.id].toString().toLowerCase().includes(col.filter.toLowerCase());
//     });
//   });

//   const handleNewRowChange = (field, value) => {
//     setNewRow({ ...newRow, [field]: value });
//   };

//   const handleAddRow = () => {
//     setRows([...rows, { ...newRow, id: rows.length + 1 }]);
//     setNewRow({
//       id: rows.length + 2,
//       firstName: '',
//       lastName: '',
//       age: '',
//     });
//   };
//   return (
//     <div className="App">
//       <button onClick={handleAddColumn}>Add Column</button>
//       <div className="table-container">
//         <DragDropContext onDragEnd={handleDragEnd}>
//           <Droppable droppableId="droppable" direction="horizontal">
//             {(provided) => (
//               <table ref={provided.innerRef} {...provided.droppableProps}>
//                 <thead>
//                   <tr>
//                     {columns.map((column, index) => (
//                       !column.hidden && (
//                         <Draggable key={column.id} draggableId={column.id} index={index}>
//                           {(provided) => (
//                             <th ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                               <div className="filter-container">
//                                 {column.editable ? (
//                                   <input
//                                     type="text"
//                                     value={column.headerName}
//                                     onChange={e => handleEditHeader(column.id, e.target.value)}
//                                   />
//                                 ) : (
//                                   column.headerName
//                                 )}
//                                 <button onClick={() => toggleColumnVisibility(column.id)}>Toggle</button>
//                                 <button className="sortable" onClick={() => handleSort(column.id)}>
//                                   {column.sort === 'asc' ? '↑' : column.sort === 'desc' ? '↓' : '↕️'}
//                                 </button>
//                                 <input
//                                   type="text"
//                                   placeholder="Filter"
//                                   value={column.filter}
//                                   onChange={e => handleFilterChange(column.id, e.target.value)}
//                                 />
//                               </div>
//                             </th>
//                           )}
//                         </Draggable>
//                       )
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr className="form-row">
//                     {columns.map(column => (
//                       !column.hidden && column.id !== 'fullName' && (
//                         <td key={column.id}>
//                           <input
//                             type={column.id === 'age' ? 'number' : 'text'}
//                             placeholder={column.headerName}
//                             value={newRow[column.id] || ''}
//                             onChange={e => handleNewRowChange(column.id, e.target.value)}
//                           />
//                         </td>
//                       )
//                     ))}
//                     <td>
//                       <button onClick={handleAddRow}>Add Row</button>
//                     </td>
//                   </tr>
//                   {filteredRows.map(row => (
//                     <tr key={row.id}>
//                       {columns.map(column => (
//                         !column.hidden && (
//                           <td key={column.id}>
//                             {column.editable ? (
//                               <input
//                                 type={column.id === 'age' ? 'number' : 'text'}
//                                 value={row[column.id]}
//                                 onChange={e => handleEditCell(row.id, column.id, e.target.value)}
//                               />
//                             ) : (
//                               row[column.id] || `${row.firstName} ${row.lastName}`
//                             )}
//                           </td>
//                         )
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </div>
//     </div>
//   );
// }

// export default App;

// вариант по образцу https://www.material-react-table.com/docs/examples/editing-crud-inline-row#editing-crud-row-demo
// import { useMemo, useState } from 'react';
// import './App.css';

// const fakeData = [
//   { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', state: 'CA' },
//   // more data here
// ];
// const usStates = ['CA', 'NY', 'TX', 'FL'];

// const validateRequired = (value) => !!value.length;
// const validateEmail = (email) =>
//   !!email.length &&
//   email
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//     );

// function validateUser(user) {
//   return {
//     firstName: !validateRequired(user.firstName)
//       ? 'First Name is Required'
//       : '',
//     lastName: !validateRequired(user.lastName) ? 'Last Name is Required' : '',
//     email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
//   };
// }

// const Example = () => {
//   const [users, setUsers] = useState(fakeData);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [editingRow, setEditingRow] = useState(null);
//   const [creatingRow, setCreatingRow] = useState(false);

//   const columns = useMemo(() => [
//     { accessorKey: 'id', header: 'Id', editable: false },
//     { accessorKey: 'firstName', header: 'First Name' },
//     { accessorKey: 'lastName', header: 'Last Name' },
//     { accessorKey: 'email', header: 'Email' },
//     { accessorKey: 'state', header: 'State' },
//   ], []);

//   const handleCreateUser = (newUser) => {
//     const errors = validateUser(newUser);
//     if (Object.values(errors).some(error => error)) {
//       setValidationErrors(errors);
//       return;
//     }
//     setValidationErrors({});
//     setUsers([...users, { ...newUser, id: (Math.random() + 1).toString(36).substring(7) }]);
//     setCreatingRow(false);
//   };

//   const handleSaveUser = (updatedUser) => {
//     const errors = validateUser(updatedUser);
//     if (Object.values(errors).some(error => error)) {
//       setValidationErrors(errors);
//       return;
//     }
//     setValidationErrors({});
//     setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
//     setEditingRow(null);
//   };

//   const handleDeleteUser = (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       setUsers(users.filter(user => user.id !== userId));
//     }
//   };

//   return (
//     <div>
//       <button onClick={() => setCreatingRow(true)}>Create New User</button>
//       <table>
//         <thead>
//           <tr>
//             {columns.map(column => (
//               <th key={column.accessorKey}>{column.header}</th>
//             ))}
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               {columns.map(column => (
//                 <td key={column.accessorKey}>
//                   {editingRow === user.id ? (
//                     <input
//                       type={column.accessorKey === 'email' ? 'email' : 'text'}
//                       defaultValue={user[column.accessorKey]}
//                       onBlur={(e) => handleSaveUser({ ...user, [column.accessorKey]: e.target.value })}
//                     />
//                   ) : (
//                     user[column.accessorKey]
//                   )}
//                 </td>
//               ))}
//               <td>
//                 {editingRow === user.id ? (
//                   <button onClick={() => handleSaveUser(user)}>Save</button>
//                 ) : (
//                   <>
//                     <button onClick={() => setEditingRow(user.id)}>Edit</button>
//                     <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//           {creatingRow && (
//             <tr>
//               {columns.map(column => (
//                 <td key={column.accessorKey}>
//                   <input
//                     type={column.accessorKey === 'email' ? 'email' : 'text'}
//                     placeholder={column.header}
//                     onBlur={(e) => setCreatingRow({ ...creatingRow, [column.accessorKey]: e.target.value })}
//                   />
//                 </td>
//               ))}
//               <td>
//                 <button onClick={() => handleCreateUser(creatingRow)}>Add</button>
//                 <button onClick={() => setCreatingRow(false)}>Cancel</button>
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Example;

// код с dnd kit 
import { useMemo, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  SortableItem,
  SortableHeaderItem,
} from "./components/SortableComponents";
import "./App.css";

const fakeData = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    state: "CA",
  },
  // more data here
];
const usStates = ["CA", "NY", "TX", "FL"];

const validateRequired = (value) => !!value.length;
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

function validateUser(user) {
  return {
    firstName: !validateRequired(user.firstName)
      ? "First Name is Required"
      : "",
    lastName: !validateRequired(user.lastName) ? "Last Name is Required" : "",
    email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
  };
}

const Example = () => {
  const [users, setUsers] = useState(fakeData);
  const [validationErrors, setValidationErrors] = useState({});
  const [editingRow, setEditingRow] = useState(null);
  const [creatingRow, setCreatingRow] = useState(false);
  const [columns, setColumns] = useState([
    { accessorKey: "id", header: "Id", editable: false },
    { accessorKey: "firstName", header: "First Name" },
    { accessorKey: "lastName", header: "Last Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "state", header: "State" },
  ]);
  const [editingData, setEditingData] = useState({});

  const handleCreateUser = (newUser) => {
    const errors = validateUser(newUser);
    if (Object.values(errors).some((error) => error)) {
      setValidationErrors(errors);
      console.log(errors)
      return;
    }
    setValidationErrors({});
    setUsers([
      ...users,
      { ...newUser, id: (Math.random() + 1).toString(36).substring(7) },
    ]);
    setCreatingRow(false);
  };

  // const handleSaveUser = (updatedUser) => {
  //   const errors = validateUser(updatedUser);
  //   if (Object.values(errors).some((error) => error)) {
  //     setValidationErrors(errors);
  //     return;
  //   }
  //   setValidationErrors({});
  //   setUsers(
  //     users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
  //   );
  //   console.log(users);
  //   setEditingRow(null);
  // };
  const handleSaveUser = () => {
    console.log("Attempting to save user:", editingData);
    const errors = validateUser(editingData);
    if (Object.values(errors).some((error) => error)) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});
    setUsers(
      users.map((user) => (user.id === editingData.id ? editingData : user))
    );
    setEditingRow(null);
    setEditingData({});
  };

  const handleEditChange = (key, value) => {
    setEditingData({ ...editingData, [key]: value });
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setUsers((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleColumnDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setColumns((items) => {
        const oldIndex = items.findIndex(
          (item) => item.accessorKey === active.id
        );
        const newIndex = items.findIndex(
          (item) => item.accessorKey === over.id
        );
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div>
      <button onClick={() => setCreatingRow(true)}>Create New User</button>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleColumnDragEnd}
      >
        <table>
          <thead>
            <SortableContext
              items={columns.map((column) => column.accessorKey)}
              strategy={horizontalListSortingStrategy}
            >
              <tr>
                {columns.map((column) => (
                  <SortableHeaderItem
                    key={column.accessorKey}
                    id={column.accessorKey}
                  >
                    {column.header}
                  </SortableHeaderItem>
                ))}
                <th>Actions</th>
              </tr>
            </SortableContext>
          </thead>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={users.map((user) => user.id)}
              strategy={verticalListSortingStrategy}
            >
              <tbody>
                {users.map((user) => (
                  <SortableItem key={user.id} id={user.id}>
                    {columns.map((column) => (
                      <td key={column.accessorKey}>
                        {editingRow === user.id ? (
                          column.accessorKey === "state" ? (
                            <select
                              defaultValue={user[column.accessorKey]}
                              onPointerDown={(e) => e.stopPropagation()}
                              // onChange={(e) =>
                              //   handleSaveUser({
                              //     ...user,
                              //     [column.accessorKey]: e.target.value,
                              //   })
                              // }
                              onChange={(e) =>
                                handleEditChange(column.accessorKey, e.target.value)
                              }
                            >
                              {usStates.map((state) => (
                                <option key={state} value={state}>
                                  {state}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <div>
                            <input
                              type={
                                column.accessorKey === "email"
                                  ? "email"
                                  : "text"
                              }
                              defaultValue={user[column.accessorKey]}
                              onPointerDown={(e) => e.stopPropagation()}
                              // onChange={(e) =>
                              //   handleSaveUser({
                              //     ...user,
                              //     [column.accessorKey]: e.target.value,
                              //   })
                              // }
                              onChange={(e) =>
                                handleEditChange(column.accessorKey, e.target.value)
                              }
                            />
                            {validationErrors[column.accessorKey] && (
                              <div className="error">
                                {validationErrors[column.accessorKey]}
                              </div>
                            )}
                            </div>
                          )
                        ) : (
                          user[column.accessorKey]
                        )}
                      </td>
                    ))}
                    <td>
                      {editingRow === user.id ? (
                        <button
                        onPointerDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSaveUser(user);
                          console.log(e);
                          console.log(user);
                        }}
                        >
                          Save
                        </button>
                      ) : (
                        <>
                          <button
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              e.preventDefault();
                              setEditingRow(user.id);
                              setEditingData(user);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteUser(user.id);
                            }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </SortableItem>
                ))}
                {creatingRow && (
                  <tr>
                    {columns.map((column) => (
                      <td key={column.accessorKey}>
                        {column.accessorKey === "state" ? (
                          <select
                            onChange={(e) =>
                              setCreatingRow({
                                ...creatingRow,
                                [column.accessorKey]: e.target.value,
                              })
                            }
                          >
                            <option value="" disabled selected>
                              Select State
                            </option>
                            {usStates.map((state) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <>
                          <input
                            type={
                              column.accessorKey === "email" ? "email" : "text"
                            }
                            placeholder={column.header}
                            onBlur={(e) =>
                              setCreatingRow({
                                ...creatingRow,
                                [column.accessorKey]: e.target.value,
                              })
                            }
                          />
                          {validationErrors[column.accessorKey] && (
                            <div className="error">
                              {validationErrors[column.accessorKey]}
                            </div>
                          )}
                          </>
                        )}
                      </td>
                    ))}
                    <td>
                      <button onClick={() => handleCreateUser(creatingRow)}>
                        Add
                      </button>
                      <button onClick={() => setCreatingRow(false)}>
                        Cancel
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </SortableContext>
          </DndContext>
        </table>
      </DndContext>
    </div>
  );
};

export default Example;
