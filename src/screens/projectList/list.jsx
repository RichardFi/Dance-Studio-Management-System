
export const List = ({users, list}) =>{
    return <table>
        <thead>
            <tr>
                <th>project</th>
                <th>person</th>
            </tr>
            </thead>
            <tbody>
                {
                    list.map(project => <tr key={project.id}>
                        <td>{project.name}</td>
                        <td>{users.find(user => user.id === project.personId)?.name || "unknown"}</td>

                    </tr>)
                }
            </tbody>
    </table>
}