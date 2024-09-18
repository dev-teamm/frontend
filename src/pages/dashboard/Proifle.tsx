import InputField from "../../components/InputField";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import useAuth from "../../hooks/useAuth";

export function Profile() {
  const { user } = useAuth();
  return (
    <div className="flex justify-center items-center">
        <Tabs defaultValue="account" className="w-[80%]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <InputField
                label="Names"
                name="name"
                value={user?.firstName + " " + user?.lastName}
                readOnly
              />
            </div>
            <div className="space-y-1">
              <InputField
                label="Email"
                name="email"
                value={user?.email}
                readOnly
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <InputField
                name="currentPassword"
                label="Current Password"
                required
              />
            </div>
            <div className="space-y-1">
              <InputField
                name="newPassword"
                label="New Password"
                required
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  );
}
