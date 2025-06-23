using System.Runtime.Serialization;

namespace ShopperMartBackend.Services
{
    [Serializable]
    internal class ProductAlreadyExistException : Exception
    {
        public ProductAlreadyExistException()
        {
        }

        public ProductAlreadyExistException(string? message) : base(message)
        {
        }

        public ProductAlreadyExistException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected ProductAlreadyExistException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}