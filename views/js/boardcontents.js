function delchk(post) {
  if (confirm("삭제하시겠습니까?")) {
    location.href = "/";
    return true;
  } else {
    console.log(post.userid);
    return false;
  }
}
