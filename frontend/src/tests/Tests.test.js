import { render, fireEvent } from "@testing-library/react";
import CryptoPrice from "../components/CryptoPrice";
import ManageResources from "../components/ManageResources";
import NavigationBar from "../components/NavigationBar";
import { signup, signin } from "../context/AuthContext";
import Manage from "../routes/Manage";
import Signin from "../routes/Signin";
import Signup from "../routes/signup";
import { _fetch } from "../Utility";


const host = "http://localhost:3001";

//test 1
test("Signup test", () => {
    const rendered = render(
        <Signup/>
    );
    const email = rendered.getByTestId("email");
    const password = rendered.getByTestId("password");
    const submit = rendered.getByTestId("submit");

    fireEvent.change(email, {target: {value: "adjfklajdkfljaklfjkladsdjfasf@gmail.com"}});
    fireEvent.change(password, {target: {value: "123rithik"}});
    fireEvent.click(submit);
    expect(localStorage.getItem("token")).not.toBe("");
});

//test 2
test("Signin test", () => {
    const rendered = render(
        <Signin/>
    );
    const email = rendered.getByTestId("email");
    const password = rendered.getByTestId("password");
    const submit = rendered.getByTestId("submit");

    fireEvent.change(email, {target: {value: "rithikp@rithik.com"}});
    fireEvent.change(password, {target: {value: "123rithik"}});
    fireEvent.click(submit);
    expect(localStorage.getItem("token")).not.toBe("");
});

//test 3
test("Signout test", () => {
    const rendered = render(
        <NavigationBar/>
    );
    const signout = rendered.getByTestId("signout");
    fireEvent.click(signout);
    expect(localStorage.getItem("token")).toBe("");

});

//test 4
test("fetch resources test", async () => {
    const resources = await _fetch(host + "/resources/get");
    console.log("resources", resources);
    expect(Object.keys(resources).includes("data")).toBe(true);

});

//test 5
test("fetch account test", async () => {
    const account = await _fetch(host + "/resources/get");
    expect(Object.keys(account).includes("data")).toBe(true);
});

//test 6
test("Delete resource test", async() => {
    const response = await fetch(host + "/resources/update", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: localStorage.getItem("token"),
          favorites: [],
        }),
      });
    expect(Object.keys(response).includes("data")).toBe(true);
});

//test 7
test("Delete resource none selected test", () => {
    const rendered = render(
        <ManageResources
            reverseDelete={true}
            key={false}
            url={""} 
            favs={[]}
            resources={[]}
        />
    );
    const button = rendered.getAllByTestId("delete");
    expect(button).toBeDisabled();
});

//test 8
test("Invalid Crypto Price", () => {
    const rendered = render(
        <CryptoPrice token="fake" />
    );
    const price = rendered.getByTestId("price");
    expect(price.textContent.trim()).toBe(
        ""
      );
});

//test 9
test("Valid Crypto Price", () => {
    const rendered = render(
        <CryptoPrice token="ethereum" />
    );
    const price = rendered.getByTestId("price");
    setTimeout(() => {
        expect(price.textContent.trim()).not.toBe(
            ""
          );
      }, 2000)
});
