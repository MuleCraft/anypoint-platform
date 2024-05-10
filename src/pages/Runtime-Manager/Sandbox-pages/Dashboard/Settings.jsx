import Nav from "../../../../components/NavbarHome";
import { SandboxSetting } from "../../../../components/Runtime-Manager/Sandbox/Dashboard/SandboxSettings";
export default function SandboxSettingmain({ name, pathValue }) {
    return (
        <div className="home">
            <Nav name={name} pathValue={pathValue} />
            <div className="Wrapper">
                <SandboxSetting name={name} />
            </div>
        </div>
    );
}