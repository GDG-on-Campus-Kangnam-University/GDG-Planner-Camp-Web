import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user_id, password } = req.body;

    try {
      // Prisma로 유저를 찾는 코드
      const user = await prisma.user.findUnique({
        where: { studentId: user_id },
      });

      // 유저가 존재하고 비밀번호가 일치하는지 확인
      if (user && user.password === password) {
        res.status(200).json({ message: '로그인 성공', user });
      } else {
        res.status(401).json({ message: '아이디나 비밀번호가 일치하지 않습니다.' });
      }
    } catch (error) {
      res.status(500).json({ message: '서버 오류' });
    }
  } else {
    res.status(405).json({ message: '허용되지 않은 요청 방식입니다.' });
  }
}
