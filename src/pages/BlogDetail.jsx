import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogApi from "../api/BlogApi";
import BlogdetailCBN from "../components/User/Blogdetail";
import { formatTimestamp } from "../tool";
import Comment from "../components/User/Comment";

function BlogDetail() {
  let { _id } = useParams();

  const [blog, setBlog] = useState();

  useEffect(() => {
    const CallApi = async () => {
      const dataCallApi = await BlogApi.getById(_id);
      if (dataCallApi.success) {
        setBlog(dataCallApi.dataOut);
      }
    };
    CallApi();
  }, [_id]);

  return (
    <>
      {blog && (
        <div className="container">
          <div className="row">
            <BlogdetailCBN
              Name={blog.Name}
              Tite={blog.Title}
              data={blog.Data}
              CreatAt={formatTimestamp(blog.createdAt)}
            />
          </div>
          <div className="row">
            
          <Comment ProductId={_id} />
          </div>
        </div>
      )}
    </>
  );
}

export default BlogDetail;
