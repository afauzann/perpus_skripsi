import { addDoc, collection } from 'firebase/firestore';
import { AddUser } from '../graphql/typeDefs/users.graphql';
import { auth, db } from '../configs/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useMutation } from '@apollo/client';
import { bcrypt } from '../utils/bcrypt';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React from 'react'

const MySwal = withReactContent(Swal);

const Alert = MySwal.mixin({
	toast: false,
	showConfirmButton: true,
	customClass: {
		container: "custom-toast",
	},
});

export default function Register() {
    const [addUser] = useMutation(AddUser);

    
        const register = async (name, email, password, role) => {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
    
            await addUser({
                variables: {
                    id: user.uid,
                    nama: name,
                    email: email,
                    password: bcrypt(password),
                },
            });
    
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name,
                role,
                email,
            });
            setTimeout(
                () =>
                    Alert.fire({
                        icon: "success",
                        title: <strong>Sukses</strong>,
                        text: "Register berhasil",
                        background: "#fefefe",
                        confirmButtonColor: "#0000ff",
                    }),
                2000
            );
    }

  return register;
}
