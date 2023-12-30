import { useRouter } from "next/navigation";
import Dropdown from "react-bootstrap/Dropdown";

function SignInDropDown({ avatar, userName }) {
  const router = useRouter();
  const handleSignOut = () => {
    localStorage.removeItem("user");
    router.push("/");
  };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        userName
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>Thông tin tài khoản</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSignOut()}>Đăng xuất</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SignInDropDown;
