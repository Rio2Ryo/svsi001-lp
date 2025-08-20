"use client";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <section className="first-view">
          <div className="fv-top">
            <Image src="/fv-powder.jpg" alt="Confidence powder" fill priority style={{ objectFit: 'cover' }} />
            <div className="fv-top-inner">
              <h2 className="fv-confidence">
                Mother Vegetables
                <br />
                Confidence
              </h2>
              <p className="fv-tagline">
                サステナブルベジタブルと生まれたスキンケア オーガニックボディパウダー
              </p>
            </div>
          </div>

          <h1 className="fv-catch">
            その選択が
            <br />
            肌も、地球も、美しく育てる
          </h1>

          <div className="fv-earth">
            <Image src="/fv-earth.jpg" alt="Earth" fill style={{ objectFit: 'cover' }} />
            <div className="fv-earth-text">
              <p>
                Mother Vegetables から生まれた「マザベジコンフィデンス」<br />
                それはあなたの肌をやさしく育てながら地球環境を整えていく<br />
                世界で唯一の存在です。<br />
                <br />
                あなたの美しさと、地球の未来を同時に育てる<br />
                そんな、新しいスキンケアのかたちを誕生させました。<br />
                <br />
                あなたの肌を包み守るように、地球へやさしい選択をする<br />
                すべては、あなたの輝きを極める選択から始まります
              </p>
            </div>
          </div>
        </section>
    </>
  );
}

