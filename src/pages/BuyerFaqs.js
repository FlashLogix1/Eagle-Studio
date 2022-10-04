import React, { Fragment, useEffect } from 'react';
import '../../src/CustomStyles.css';

const BuyerFaqsComponent = () => {

  // runs on the first render only
  useEffect( () => {
    let coll = document.getElementsByClassName("collapsible");
    let i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        } 
      });
    }
  },
  []
  );


  return (
    <Fragment>
        <div style={{padding: "0px 150px", marginTop: "20px", marginBottom: "60px"}}>
          <h1 className='buyerFaqs1CustomStyle'>Buyer FAQ’s</h1>
          
          <button className="collapsible">What Does A Complete Project Contains?</button>
          <div className="content">
            <p>App Template you buy from Appngamereskin Marketplace contains following things:</p>
            <p>a- Project Source Code</p>
            <p>b- Reskin Documentation Guide of the Project</p>
            <p>Project source code also includes graphics, but you have to design your own graphics to complete the reskin process and replace your graphics with original App Graphics.</p>
          </div>

          <button className="collapsible">Can I Use The Purchased Project Source Code Multiple Times?</button>
          <div className="content">
            <p>If you buy Multiple App License for the App Template, then you can use it multiple times for several projects.</p>
          </div>

          <button className="collapsible">How Can I Sell My Own Game Source Code?</button>
          <div className="content">
            <p>Provide your product promo graphic, thumbnail graphic, your product title, product detail description with features &amp; Requirements. List all details about your App template, how it is unique from other templates, and what is the gameplay. You must include your App Video Demo.</p>
            <p>Upload product source code files &amp; Reskin documentation guide, if your App includes a server then you must also provide all details &amp; requirements about the server. You must also include the server deployment documentation.</p>
            <p>Finally, add the Single License price, multiple App license price, development hours it has taken to develop the App, that’s it. Now upload &amp; publish the App.</p>
            <p>Our team will review your App within 24 hours and make it available on our marketplace for sale.</p>
          </div>

          <button class="collapsible">What Is The Mode Of The Payment?</button>
          <div class="content">
            <p>You can pay via Papal, online bank or through your debit card &amp; Credit card.</p>
          </div>

          <button class="collapsible">Do You Give Any Kind Of Guarantees?</button>
          <div class="content">
            <p>We offer 15 days money back guarantee in case if the product is not working or has bugs those are not resolved by the author of the product or if product mislead the information listed on the product page.</p>
          </div>

          <button class="collapsible">What If The Code Is Buggy?</button>
          <div class="content">
            <p>Appngamereskin is the only Apps marketplace that works as a bridge between buyers &amp; authors of the products. We make sure that the author must provide continuous support to make his product bug free. Both buyers &amp; sellers can communicate through our marketplace via comments section.</p>
          </div>

          <button class="collapsible">Can I Make The Changes In The Source Code after I Purchase the Product?</button>
          <div class="content">
            <p>Yes you can make the changes in the source code &amp; can customize it as per your needs.</p>
          </div>
        </div>
        

    </Fragment>
  )
}

export default BuyerFaqsComponent;
