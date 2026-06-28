import FAQuestion from "../components/faqs/FAQuestion"

function FAQ() {
    return(
        <>
        <div className="w-[87%] m-auto my-15">
            <p className="text-3xl font-bold mb-8">FAQ</p>
            <FAQuestion question={"How do I track my orders?"} answer={"We typically process and ship orders within 1-2 business days. Depending on your location, it can take an additional 2-7 days to arrive."}/>
            <FAQuestion question={"What is your return policy?"} answer={"If you're not satisfied with your purchase, we accept returns within 30 days of delivery. To initiate a return, please email us at support@myecommercestore.com with your order number and a brief explanation of why you're returning the item."}/>
            <FAQuestion question={"How do I contact customer support?"} answer={"You can contact our customer support team by emailing us at support@myecommercestore.com, or by calling us at (555) 123-4567 between the hours of 9am and 5pm EST, Monday through Friday."}/>
            <FAQuestion question={"Can I change or cancel my order?"} answer={"Unfortunately, once an order has been placed, we are not able to make changes or cancellations. If you no longer want the items you've ordered, you can return them for a refund within 30 days of delivery."}/>
            <FAQuestion question={"Do you offer international shipping?"} answer={"Currently, we only offer shipping within the United States."}/>
            <FAQuestion question={"What payment methods do you accept?"} answer={"We accept visa,mastercard,paypal payment method also we have cash on delivery system."}/>
        </div>
        </>
    )
}


export default FAQ