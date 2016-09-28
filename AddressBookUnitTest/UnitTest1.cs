using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using AddressBookWebAPI.Models;
using AddressBookWebAPI.Repositories;

namespace AddressBookUnitTest
{
    [TestClass]
    public class AddressBookTest
    {
        [TestMethod]
        public void AddContact()
        {


            bool retval = false;

           
            Contact objContact = new Contact()
            {
                Name= "Test Man",
                Email= "Test@Man",
                JobPosition="Developer",
                Institution="IIASA",
                AddressLine="Ottostrasse 6 , Munich , Germany"
                
            };

            ContactRepository cs = new ContactRepository();
            Contact returnObject = null;
            try
            {
                returnObject  = cs.Add(objContact);
                retval = Assert.Equals(returnObject.Name, objContact.Name) &&
                Assert.Equals(returnObject.Email, objContact.Email) &&
                Assert.Equals(returnObject.JobPosition, objContact.JobPosition) &&
                Assert.Equals(returnObject.Institution, objContact.Institution) &&
                Assert.Equals(returnObject.AddressLine, objContact.AddressLine);
            }
            catch (Exception ex)
            {
                Assert.IsTrue(retval, "Add contact failed");
            }
           
           

            

            Assert.IsTrue(retval, "Add contact failed");

        }
    }
}
