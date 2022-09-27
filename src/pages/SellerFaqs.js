import React, { Fragment, useEffect } from 'react';
import '../../src/CustomStyles.css';

const SellerFaqsComponent = () => {

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
  } );


  return (
    <Fragment>
        <h1 className='buyerFaqs1CustomStyle'>Seller FAQ’s</h1>
        
        <button className="collapsible">How Can I Sell My Product And Source Code On Any Online Market Place?</button>
        <div className="content">
            <p>You can sell your source to our marketplace along with other marketplaces at one time. There are two types’ benefits of product listing membership i.e Exclusive Listing &amp; Non- Exclusive Listing.</p>
            <p>Moreover, if once you upload your app source code on our marketplace, you are not right to upload your product to any other marketplace. We charge only 20% Commission for our services to our Exclusive Members.</p>
            <p>If you list products in our marketplace as non-exclusive member, we charge only 30% commission on your earnings, but you have also freedom to upload your products to other marketplaces.</p>
        </div>

        <button className="collapsible">When I Will Get My Payments?</button>
        <div className="content">
            <p>We transfer payments twice in one month to our members.</p>
        </div>

        <button className="collapsible">How Much Minimum Amount Of Payment I Have To Make For My Payout?</button>
        <div className="content">
            <p>Minimum payout amount is USD300.</p>
        </div>

        <button class="collapsible">How Much Time It Takes From Upload To Approving One Item For Online Sale?</button>
        <div class="content">
            <p>it just takes only 24 hours for us to review uploaded item.</p>
        </div>

        <button class="collapsible">I’m Not A Developer, Can I Sell My App?</button>
        <div class="content">
            <p>If you have full rights of an app, you can sell its template on Appngamereskin. However, if your buyers find any difficulty and you are not able to guide properly, we will definitely refund their money.</p>
            <p>We intensely advise you to provide a very complete documentation file so buyers trust your product. Moreover, you will reduce the chance of your template being rejected by Appngamereskin.</p>
        </div>

        <button class="collapsible">Can I Have The Price Of My Item Reviewed?</button>
        <div class="content">
            <p>After completing the submission process, authors can advise the price for their product. The review team will decide the last price after having done in detailed analysis, and will contact the author with the final decision.</p>
        </div>

        <button class="collapsible">How much I earn if I sell my Ready2Go App?</button>
        <div class="content">
            <p>You will earn 50% of the total price of a Quick Launch/Ready2Go App or Game.</p>
        </div>

        <button class="collapsible">What Is Difference B/W Single And Multiple Licenses?</button>
        <div class="content">
            <p>The difference between single and multiple licenses is the number of projects you can use the product source code in.</p>
            <p><strong>Single License:</strong></p>
            <p>Single App License provides the perfect use of the purchased items for the one project that is your own or on behalf of your clients.</p>
            <p><strong>Multiple Licenses: </strong></p>
            <p>Multiple app License is more expensive as compare the regular license but you cannot sell the source code “AS IS “editing is required for generating a sublicense.</p>
        </div>


    </Fragment>
  )
}

export default SellerFaqsComponent;
