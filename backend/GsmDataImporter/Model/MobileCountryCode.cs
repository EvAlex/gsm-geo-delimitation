namespace GsmDataImporter.Model
{
    public readonly struct MobileCountryCode
    {
        private readonly int value;

        public MobileCountryCode(int value)
        {
            this.value = value;
        }

        public override bool Equals(object obj)
        {
            return obj is MobileCountryCode 
                ? value.Equals(((MobileCountryCode)obj).value) 
                : false;
        }

        public override int GetHashCode()
        {
            return value.GetHashCode();
        }

        public override string ToString()
        {
            return value.ToString();
        }

        public static bool operator ==(MobileCountryCode a, MobileCountryCode b)
        {
            return a.value == b.value;
        }

        public static bool operator !=(MobileCountryCode a, MobileCountryCode b)
        {
            return a.value != b.value;
        }
    }
}