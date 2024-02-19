import { useRouter } from "next/navigation";
import Dropdown from "react-bootstrap/Dropdown";

function SignInDropDown({ avatar, userName }) {
  const router = useRouter();
  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("productCart");
    localStorage.removeItem("checkoutInfo");
    router.push("/");
  };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>Thông tin tài khoản</Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            router.push("/me/order");
          }}
        >
          Đơn hàng của tôi
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSignOut()}>Đăng xuất</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SignInDropDown;
