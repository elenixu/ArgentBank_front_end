import React from 'react'
import Features from '../../components/Features'

import IconChat from '../../assets/icon-chat.webp'
import IconMoney from '../../assets/icon-money.webp'
import IconCheck from '../../assets/icon-security.webp'

import '../../Styles/app.css'

function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <div className="features-container">
        <Features
          title="You are our #1 priority"
          info="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
          iconSrc={IconChat}
        />
        <Features
          title="More savings means higher rates"
          info="The more you save with us, the higher your interest rate will be!"
          iconSrc={IconMoney}
        />
        <Features
          title="Security you can trust"
          info="We use top of the line encryption to make sure your data and money is always safe."
          iconSrc={IconCheck}
        />
      </div>
    </div>
  )
}

export default Home
