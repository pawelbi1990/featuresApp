import { NextResponse } from "next/server";
const baseUrl = process.env.BASE_URL

const POST = async (req, res) => {
  let desc;
  let title;
  const data = await req.formData();
  const templateId = await data.get("templateId");
  console.log(templateId);

  const response = await fetch(
    `${baseUrl}/issues/${templateId}.json`,
    {
      method: "GET",
      headers: {
        "X-REDMINE-API-KEY": process.env.API_KEY,
      },
    }
  );
  if (response.ok) {
    const responseData = await response.json();
    desc = await responseData.issue.description;
    title = await responseData.issue.subject;
    return NextResponse.json(
      { message: "success", desc: desc, title: title },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "no such template" },
      { status: "400" }
    );
  }
};

export { POST };
