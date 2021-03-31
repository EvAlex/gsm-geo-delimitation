namespace GsmDataImporter.Model
{
    public readonly struct ControllerNum
    {
        private readonly int value;

        public ControllerNum(int value)
        {
            this.value = value;
        }

        public override bool Equals(object obj)
        {
            return obj is ControllerNum
                ? value.Equals(((ControllerNum)obj).value)
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

        public static bool operator ==(ControllerNum a, ControllerNum b)
        {
            return a.value == b.value;
        }

        public static bool operator !=(ControllerNum a, ControllerNum b)
        {
            return a.value != b.value;
        }
    }
}
