interface Iprops {
    users: {
        name: string,
        url: string,
        age: number,
        natio: string
    }[];
}
const UsersList: React.FC<Iprops> = ({users}) => {
      const show = users.map((user) => {
          return (
                  <tbody key={user.name}>
        <tr>
    <td><img className='profpic' src={user.url} alt="profile" /></td>
    <td>{user.name}</td>
      <td>{user.age}</td>
      <td>{user.natio}</td>
        </tr>
    </tbody>
)
          })
    return (<>
        <table className="users">
    <thead>
                <tr>
     <th>photo</th>
     <th>Name</th>
     <th>age</th>
     <th>country</th>
        </tr>
    </thead>
{show}
</table>
        </>)
}
export default UsersList;