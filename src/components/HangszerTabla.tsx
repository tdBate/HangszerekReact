import type { Hangszer } from "../data";

export function HangszerTabla(props: { data: Hangszer[] }) {
    return <>
        <table>
            <thead>
                <tr>
                    <th>Név</th>
                    <th>Ár</th>
                </tr>
            </thead>

            <tbody>
                {props.data.map(item => (
                    <tr>
                        <td>{item.nev}</td>
                        <td>{item.ar}</td>
                    </tr>))}
            </tbody>
        </table>
    </>
}