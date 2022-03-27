import { NextApiRequest, NextApiResponse } from "next";

// helper function
import withHandler, { IResponseType } from "@src/libs/server/widthHandler";
import { withApiSession } from "@src/libs/server/withSession";
import prisma from "@src/libs/client/prisma";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const {
    body: { question },
    session: { user },
    method,
  } = req;

  try {
    if (method === "GET") {
      const posts = await prisma.post.findMany({
        include: {
          user: {
            select: {
              name: true,
            },
          },
          _count: {
            select: {
              answers: true,
              recommendations: true,
            },
          },
        },
      });

      res.status(200).json({
        ok: true,
        message: "모든 질문을 가져왔습니다.",
        posts,
      });
    } else if (method === "POST") {
      const createdPost = await prisma.post.create({
        data: {
          question,
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });

      res.status(200).json({
        ok: true,
        message: "새로운 질문을 생성했습니다.",
        post: createdPost,
      });
    }
  } catch (error) {
    console.error("/api/posts error >> ", error);

    res.status(500).json({
      ok: false,
      message: "서버측 에러입니다.\n잠시후에 다시 시도해주세요",
      error,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);