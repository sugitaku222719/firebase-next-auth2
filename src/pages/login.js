import styles from '../styles/Home.module.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Col, Container, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import { useState } from 'react';
import { useRouter } from 'next/router';

import Header from '../components/Header'
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 

  const doLogin = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert( 'ログインOK！' );
        console.log( user );
        router.push('/');
      })
      .catch((error) => {
        console.log(error);
        alert( 'メールアドレスかパスワードが間違っています！' );
      });
  }

  // パスワードを忘れた場合のリンクタグを追加
  return (
    <div className={styles.card}>
      <h1>ログイン</h1>
      <Header/>
      <div style={{ paddingBottom: "1rem" }}>
        <Form>
            <FormGroup>
              <Label>
                メールアドレス：
              </Label>
              <Input
                type="email"
                name="email"
                style={{ height: 50, fontSize: "1.2rem" }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>
                パスワード：
              </Label>
              <Input
                type="password"
                name="password"
                style={{ height: 50, fontSize: "1.2rem" }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button
                style={{ width: 220 }}
                color="primary"
                onClick={()=>{
                  doLogin();
                }}
              >
              ログイン
            </Button>
        </Form>
      </div>
      <div>
        <Link
        href="/forgot_password">
        パスワードを忘れた場合
        </Link>
      </div>
      <Link
        href="/register">
        新規登録
      </Link>
    </div>
  )
}