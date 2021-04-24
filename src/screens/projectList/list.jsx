import { updateLanguageServiceSourceFile } from "typescript";

export const List = ({users, list}) =>{
    return <table>
        <thead>
            <tr>
                <th>name</th>
                <th>person</th>
            </tr>
            </thead>
            <tbody>
                {
                    list.map(project => <tr>
                        <td>{project.name}</td>
                        <td>{users.find(user => user.id === project._id)?.name || "unknown"}</td>

                    </tr>)
                }
            </tbody>
    </table>
}