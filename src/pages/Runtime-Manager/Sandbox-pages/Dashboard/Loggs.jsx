import Nav from "../../../../components/NavbarHome";
import { SandboxLoggs } from "../../../../components/Runtime-Manager/Sandbox/Dashboard/SandboxLoggs";
export default function DashboardLog({ name, pathValue }) {

    return (
        <div className="home">
            <Nav name={name} pathValue={pathValue} />
            <div className="Wrapper">
                <SandboxLoggs name={name} />
            </div>
        </div>
    );
}