namespace GsmDataImporter.Model
{
    public readonly struct MobileNetworkCode
    {
        private readonly string value;

        public MobileNetworkCode(string value)
        {
            this.value = value;
        }

        public override bool Equals(object obj)
        {
            return obj is MobileNetworkCode
                ? value.Equals(((MobileNetworkCode)obj).value)
                : false;
        }

        public override int GetHashCode()
        {
            return value.GetHashCode();
        }

        public static bool operator ==(MobileNetworkCode a, MobileNetworkCode b)
        {
            return a.value == b.value;
        }

        public static bool operator !=(MobileNetworkCode a, MobileNetworkCode b)
        {
            return a.value != b.value;
        }
    }
}
