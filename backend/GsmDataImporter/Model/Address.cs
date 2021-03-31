namespace GsmDataImporter.Model
{
    public readonly struct Address
    {
        private readonly string value;

        public Address(string value)
        {
            this.value = value;
        }

        public override bool Equals(object obj)
        {
            return obj is Address
                ? value.Equals(((Address)obj).value)
                : false;
        }

        public override int GetHashCode()
        {
            return value.GetHashCode();
        }

        public static bool operator ==(Address a, Address b)
        {
            return a.value == b.value;
        }

        public static bool operator !=(Address a, Address b)
        {
            return a.value != b.value;
        }
    }
}
