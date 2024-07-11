"use client";

import Layout from "@/components/Layout";
import Link from "next/link";
import Login from "./Login";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import Loading from "./Loading";
import { mapping } from "../utils/functions";

const Page = () => {
  const router = useRouter();
  const [auth, setAuth] = useState();
  const [user, setUser] = useState();
  const [username, setUserName] = useState();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    setAuth(sessionStorage.getItem("session"));
    setAdmin(sessionStorage.getItem("superUser"));
    setUser(sessionStorage.getItem("user"));
    const client = mapping.filter((item) => (item.id = user));
    setUserName(client);

    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    auth !== undefined &&
    (auth && admin ? (
      <Layout title="">
        <div className="products-item-container">
          <Link href="/products" className="products-item">
            All features
          </Link>
          <Link href="/newFeature" className="products-item">
            Add new feature
          </Link>
          <Link href="/deleteFeature" className="products-item">
            Delete feature
          </Link>
        </div>
      </Layout>
    ) : auth && !admin ? (
      <Layout title="">
        <div className="products-item-container">
          <Link href="/products" className="products-item">
            All features
          </Link>
        </div>
      </Layout>
    ) : (
      <Login />
    ))
  );
};

export default Page;
